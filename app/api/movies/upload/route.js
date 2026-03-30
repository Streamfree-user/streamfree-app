import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract fields
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const rating = parseInt(formData.get('rating'));
    const duration = parseInt(formData.get('duration'));
    const releaseYear = parseInt(formData.get('releaseYear'));
    const videoSource = formData.get('videoSource');
    const cloudinaryUrl = formData.get('cloudinaryUrl');
    const posterFile = formData.get('posterFile');
    const videoFile = formData.get('videoFile');

    // Validate required fields
    if (!title || !posterFile) {
      return NextResponse.json(
        { error: 'Title and poster are required' },
        { status: 400 }
      );
    }

    // Get Sanity credentials from environment
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const token = process.env.SANITY_API_TOKEN;

    if (!projectId || !dataset || !token) {
      console.error('Missing Sanity credentials:', { projectId, dataset, token: token ? 'set' : 'missing' });
      return NextResponse.json(
        { error: 'Server configuration error. Please set SANITY_API_TOKEN environment variable.' },
        { status: 500 }
      );
    }

    const sanityUrl = `https://${projectId}.api.sanity.io/v2024-01-01`;

    // Step 1: Upload poster image
    let posterRef = null;
    if (posterFile) {
      const posterBuffer = await posterFile.arrayBuffer();
      const posterFormData = new FormData();
      posterFormData.append('file', new Blob([posterBuffer], { type: posterFile.type }), posterFile.name);

      const posterUploadResponse = await fetch(
        `${sanityUrl}/assets/images?dataset=${dataset}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: posterFormData,
        }
      );

      if (!posterUploadResponse.ok) {
        const errorData = await posterUploadResponse.text();
        console.error('Poster upload failed:', errorData);
        throw new Error(`Poster upload failed: ${posterUploadResponse.statusText}`);
      }

      const posterData = await posterUploadResponse.json();
      posterRef = {
        _type: 'image',
        asset: {
          _ref: posterData.document._id,
        },
      };
    }

    // Step 2: Upload video file (if using Sanity source)
    let videoRef = null;
    if (videoSource === 'sanity' && videoFile) {
      const videoBuffer = await videoFile.arrayBuffer();
      const videoFormData = new FormData();
      videoFormData.append('file', new Blob([videoBuffer], { type: videoFile.type }), videoFile.name);

      const videoUploadResponse = await fetch(
        `${sanityUrl}/assets/files?dataset=${dataset}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: videoFormData,
        }
      );

      if (!videoUploadResponse.ok) {
        const errorData = await videoUploadResponse.text();
        console.error('Video upload failed:', errorData);
        throw new Error(`Video upload failed: ${videoUploadResponse.statusText}`);
      }

      const videoData = await videoUploadResponse.json();
      videoRef = {
        _type: 'file',
        asset: {
          _ref: videoData.document._id,
        },
      };
    }

    // Step 3: Create movie document in Sanity
    const movieDoc = {
      _type: 'movie',
      title,
      description: description || '',
      category,
      rating,
      duration,
      releaseYear,
      videoSource,
      poster: posterRef,
      ...(videoSource === 'sanity' && videoRef && { videoFile: videoRef }),
      ...(videoSource === 'cloudinary' && { cloudinaryVideoUrl: cloudinaryUrl }),
    };

    const createResponse = await fetch(
      `${sanityUrl}/documents?dataset=${dataset}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieDoc),
      }
    );

    if (!createResponse.ok) {
      const errorData = await createResponse.text();
      console.error('Document creation failed:', errorData);
      throw new Error(`Failed to create movie: ${createResponse.statusText}`);
    }

    const createdDoc = await createResponse.json();

    return NextResponse.json({
      success: true,
      message: `Movie "${title}" uploaded successfully`,
      movieId: createdDoc.documentId || createdDoc._id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
