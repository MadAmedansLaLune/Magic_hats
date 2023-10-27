// Import the necessary Camera Kit modules.
import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
  } from '@snap/camera-kit';
  
  // Create an async function to initialize Camera Kit and start the video stream.
  (async function() {
    // Bootstrap Camera Kit using your API token.
    const cameraKit = await bootstrapCameraKit({
      apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjg0ODMxMTQ0LCJzdWIiOiJlYTg4ZjQyZC0xYmM5LTRkN2YtYTMwMS02Y2M4YzU2OTg2Y2J-U1RBR0lOR340OGY1YjJmYS1iZGNjLTQ5MzAtYjI2NS1jNGYzODliMzAwYjAifQ.BojCwDCBLoh_7wsjjiM59vkpvdCDUyDd0WVMcFjcei0'
    });
  
    // Create a new CameraKit session.
    const session = await cameraKit.createSession();
  
    // Replace the `canvas` element with the live output from the CameraKit session.
    document.getElementById('canvas').replaceWith(session.output.live);
  
    // Load the specified lens group.
    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['c3aa25f6-80ef-4d99-8685-d68397451e61'])
  
    // Apply the first lens in the lens group to the CameraKit session.
    session.applyLens(lenses[0]);
  
    // Get the user's media stream.
    let mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
  
    // Create a CameraKit media stream source from the user's media stream.
    const source = createMediaStreamSource(
        mediaStream, {
          transform: Transform2D.MirrorX,
          cameraType: 'front'
        }
    );
  
    // Set the source of the CameraKit session.
    await session.setSource(source);
  
    // Set the render size of the CameraKit session to the size of the browser window.
    session.source.setRenderSize( window.innerWidth,  window.innerHeight);
  
    // Start the CameraKit session.
    session.play();
  })();