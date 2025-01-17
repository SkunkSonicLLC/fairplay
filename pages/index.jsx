<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Magic Rings: A Journey Through Interactive 3D Learning</title>

  <!-- 
    ======================
     Project Manifesto
    ======================
    Purpose:
      - A complete educational resource
      - A technical implementation
      - A collaborative learning journey
      - A testament to purposeful digital creation

    Learning Objectives:
      1. Understand 3D web graphics fundamentals
      2. Explore interactive programming concepts
      3. Demonstrate collaborative development
      4. Inspire curiosity through code

    Project Architecture:
      - Core Technologies: (Three.js, Tone.js, [React optional], DigitalOcean, GitHub)
      - Target Audience: 5th Grade and Above, plus curious learners of all ages

    Development Journey Documentation:
      - Infrastructure: Example hosting on Digital Ocean with an Ubuntu droplet
      - Collaboration: US-based Dev, Berlin-based Review, Async Workflow

    Philosophical Reflections:
      - Code as a learning language: each line tells a story, each function an adventure
      - Programming is creative expression

    "This document is a living artifact. It breathes, grows, and transforms with each interaction."
    Created through collaborative curiosity, powered by human imagination.
  -->

  <style>
    /* 
      Styles for our entire page, ensuring the 3D scene fills the screen
      and our textual elements overlay nicely on top. 
    */
    body {
      margin: 0;            /* Remove default browser margins */
      overflow: hidden;     /* No scrollbars, the 3D canvas takes up all space */
      background: #111;     /* Dark background behind the 3D scene (if it doesn't fill) */
      font-family: Arial, sans-serif;
      color: #fff;          /* White text for contrast on dark background */
    }

    /* Centered heading at the top to display instructions/title */
    #titleBar {
      position: absolute;
      top: 10px;
      width: 100%;
      text-align: center;
      font-size: 1.2em;
      text-shadow: 1px 1px 2px black;
      pointer-events: none;
    }

    /* A floating "event log" area at the bottom-left corner, styled like a console */
    #eventLog {
      position: absolute;
      bottom: 10px;
      left: 10px;
      color: white;
      font-family: monospace;
      background: rgba(0, 0, 0, 0.7);
      padding: 10px;
      border-radius: 5px;
      max-height: 200px;
      overflow-y: auto;
      width: 300px;
      pointer-events: none; /* so it doesn’t block mouse interactions with the scene */
    }

    /* A simple button to start the audio context (needed on some browsers) */
    #startSoundBtn {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      font-size: 1em;
      background: #44ff44;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <!-- ================================
       TOP PAGE SECTION / TITLE
       ================================ -->
  <div id="titleBar">
    <strong># Magic Rings: A Journey Through Interactive 3D Learning</strong><br>
    Explore this magical circular ring, watch orbs collide with posts, 
    and see them launch away with a playful sound. Learn how a 3D scene works, 
    and let curiosity guide you!
  </div>

  <!--
      The event log: We'll log interesting interactions here (like collisions).
  -->
  <div id="eventLog">Event Log:</div>

  <!-- 
      A button to start the audio context on certain browsers.
      Many mobile/desktop browsers block audio until the user interacts.
  -->
  <button id="startSoundBtn">Start Sound</button>

  <!-- 
      Next, we load Three.js and Tone.js from CDNs. 
      We also have the entire code below that sets up our ring, orbs, collisions, etc.
  -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.25/Tone.js"></script>

  <script>
    //===============================================
    //    Magic Rings: A Fun & Interactive Demo
    //===============================================
    // 
    // 1) Wait until the page loads.
    // 2) Initialize Tone.js (sound engine).
    // 3) Create a 3D scene using Three.js.
    // 4) Animate orbs around a circular ring, 
    //    detect collisions with posts, and trigger:
    //    a) a sound effect
    //    b) a small orb duplication that launches outward
    // 5) Keep a log of collisions for educational analysis.

    // We'll store our synthesizer here so we can trigger notes on collisions.
    let synth;

    window.addEventListener('load', startMagicalRing);

    function startMagicalRing() {
      //========================================================
      // INITIALIZE TONE.JS (OUR SOUND ENGINE)
      //========================================================
      synth = new Tone.Synth().toDestination();

      const startSoundBtn = document.getElementById('startSoundBtn');
      startSoundBtn.addEventListener('click', async () => {
        // Start/resume the audio context when the user clicks
        await Tone.start();
        logEvent('Audio Context Started! Collisions will now trigger sounds.');
        startSoundBtn.style.display = 'none';
      });

      //========================================================
      // SETTING UP OUR MAGICAL WORLD
      //========================================================
      const MAGIC_RULES = {
        // The radius of our circular ring
        ringRadius: 6,
        // The vertical gap between each ring (if you had multiple ring levels)
        ropeHeight: 0.5,
        // How many rope rings we have
        numPaths: 4,
        // How many glowing orbs per ring
        nodesPerPath: 32,
        // How fast our orbs move around the ring
        moveSpeed: 0.2,
        // How many posts around the ring
        numPosts: 8,
        // How tall our posts are
        postHeight: 2.5,
        // Collision detection radius
        collisionRadius: 0.3
      };

      // Create our Three.js scene and set a background color
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111111); // A dark gray/black

      // Camera: perspective view
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      // We'll move the camera up and away from the center
      camera.position.set(0, 10, 15);
      camera.lookAt(0, 0, 0);

      // WebGL renderer for drawing the scene into a <canvas>
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Basic lighting
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Materials for ring ropes, orbs, posts, and floor
      const materials = {
        rope: new THREE.MeshBasicMaterial({ color: 0xff4444 }), // Red ring
        node: new THREE.MeshPhongMaterial({
          color: 0x44ff44,
          emissive: 0x225522,
          shininess: 30
        }),
        post: new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
        floor: new THREE.MeshPhongMaterial({
          color: 0xaaaaaa,
          side: THREE.DoubleSide
        })
      };

      // We'll store orbs in a 2D array nodes[pathIndex][orbIndex]
      const nodes = [];
      // A separate array to keep track of "duplicate" orbs after collisions
      let duplicateNodes = [];
      // We'll also keep track of the ring posts
      const posts = [];

      //========================================================
      // CREATE POSTS, ROPES, ORBS, FLOOR
      //========================================================
      createPosts();
      createRopePaths();
      createFloor();

      //========================================================
      //  CREATE POSTS (BLUE CYLINDERS AROUND THE RING)
      //========================================================
      function createPosts() {
        // A small cylinder geometry for each post
        const postGeometry = new THREE.CylinderGeometry(
          0.2,                  // top radius
          0.2,                  // bottom radius
          MAGIC_RULES.postHeight,
          16
        );

        // Place posts in a circle
        for (let i = 0; i < MAGIC_RULES.numPosts; i++) {
          const angle = (i / MAGIC_RULES.numPosts) * Math.PI * 2;
          const x = Math.cos(angle) * MAGIC_RULES.ringRadius;
          const z = Math.sin(angle) * MAGIC_RULES.ringRadius;

          const post = new THREE.Mesh(postGeometry, materials.post);
          post.position.set(x, MAGIC_RULES.postHeight / 2, z);

          // Store the angle for collision checking later
          post.userData.angle = angle;

          scene.add(post);
          posts.push(post);
        }
      }

      //========================================================
      //  CREATE ROPES (RED RINGS) & ORBS (GREEN GLOWING BALLS)
      //========================================================
      function createRopePaths() {
        for (let level = 0; level < MAGIC_RULES.numPaths; level++) {
          // Each ring is placed at a slightly different height
          const height = level * MAGIC_RULES.ropeHeight;
          const pathNodes = [];

          // Red rope ring: a torus geometry
          const ropeGeometry = new THREE.TorusGeometry(
            MAGIC_RULES.ringRadius,  // circle radius
            0.05,                    // tube thickness
            16,                      // radial segments
            100                      // tubular segments
          );
          const rope = new THREE.Mesh(ropeGeometry, materials.rope);
          rope.rotation.x = Math.PI / 2;  // lie flat
          rope.position.y = height;       // put at correct height
          scene.add(rope);

          // Add orbs around the rope
          const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);

          for (let i = 0; i < MAGIC_RULES.nodesPerPath; i++) {
            const angle = (i / MAGIC_RULES.nodesPerPath) * Math.PI * 2;
            const x = Math.cos(angle) * MAGIC_RULES.ringRadius;
            const z = Math.sin(angle) * MAGIC_RULES.ringRadius;

            // clone() so each orb can have unique material states if needed
            const orbMaterial = materials.node.clone();
            const node = new THREE.Mesh(nodeGeometry, orbMaterial);
            node.position.set(x, height, z);

            node.userData = {
              initialAngle: angle,
              angle: angle,
              height: height,
              lastPostIndex: -1  // track last collided post to prevent repeat collisions
            };

            scene.add(node);
            pathNodes.push(node);
          }
          nodes.push(pathNodes);
        }
      }

      //========================================================
      // CREATE FLOOR (GRAY CIRCLE UNDER THE RING)
      //========================================================
      function createFloor() {
        // A circle that fits the ring radius
        const floorGeometry = new THREE.CircleGeometry(MAGIC_RULES.ringRadius, 64);
        const floor = new THREE.Mesh(floorGeometry, materials.floor);
        floor.rotation.x = -Math.PI / 2; // lie flat on XZ plane
        scene.add(floor);
      }

      //========================================================
      // ANIMATE: Called once per frame to update everything
      //========================================================
      function animate(timestamp) {
        const t = timestamp * 0.001; // convert ms to seconds
        updateCamera(t);
        updateOrbs(t);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);

      //========================================================
      // CAMERA MOVEMENT (OPTIONAL, GENTLE ORBIT)
      //========================================================
      function updateCamera(t) {
        const radius = 15;
        const height = 10;
        // Slowly orbit the camera around the origin
        camera.position.x = Math.cos(t * 0.1) * radius;
        camera.position.z = Math.sin(t * 0.1) * radius;
        camera.position.y = height;
        camera.lookAt(0, 0, 0);
      }

      //========================================================
      // ORB UPDATES: Movement + Collision Checking
      //========================================================
      function updateOrbs(time) {
        // 1) Move “duplicate” orbs (those created after collisions)
        for (let i = duplicateNodes.length - 1; i >= 0; i--) {
          const dup = duplicateNodes[i];
          dup.position.add(dup.userData.velocity);
          // Basic gravity
          dup.userData.velocity.y -= 0.006;

          // Remove if it goes out of range
          if (dup.position.length() > 30 || dup.position.y < 0) {
            scene.remove(dup);
            duplicateNodes.splice(i, 1);
          }
        }

        // 2) Move orbs along their ring paths & check collisions
        nodes.forEach((pathNodes, pathIndex) => {
          pathNodes.forEach((node) => {
            // Update angle & position
            const angle = (node.userData.initialAngle + time * MAGIC_RULES.moveSpeed) 
                          % (Math.PI * 2);
            node.userData.angle = angle;
            node.position.x = Math.cos(angle) * MAGIC_RULES.ringRadius;
            node.position.z = Math.sin(angle) * MAGIC_RULES.ringRadius;

            // Check collisions with posts
            posts.forEach((post, postIndex) => {
              // Compare angles around the circle
              const postAngle = post.userData.angle;
              const angleDifference = Math.abs(angle - postAngle);
              const shortDistance = Math.min(angleDifference, 2 * Math.PI - angleDifference);
              // If within ~0.1 radians, that's "close enough" to collide
              if (shortDistance < 0.1 && node.userData.lastPostIndex !== postIndex) {
                node.userData.lastPostIndex = postIndex;
                handleCollision(node, postIndex, pathIndex);
              }
            });
          });
        });
      }

      //========================================================
      // COLLISION HANDLER
      //========================================================
      function handleCollision(node, postIndex, pathIndex) {
        logEvent(`Orb on path ${pathIndex + 1} collided with post ${postIndex + 1}!`);

        // Make the orb “flash” yellow briefly
        node.material.emissive.setHex(0xffff00);
        setTimeout(() => {
          node.material.emissive.setHex(0x225522);
        }, 200);

        // Trigger a collision sound
        playCollisionSound();

        // Create a duplicate orb that gets launched outward
        const angle = node.userData.angle;
        const copy = node.clone();
        copy.material = copy.material.clone();
        copy.material.emissive.setHex(0xffff00); // bright for clarity
        copy.userData = {
          velocity: new THREE.Vector3(
            Math.cos(angle) * 0.3, // outward x
            0.2,                   // upward y
            Math.sin(angle) * 0.3  // outward z
          )
        };
        scene.add(copy);
        duplicateNodes.push(copy);
      }

      //========================================================
      // SOUND FUNCTION
      //========================================================
      function playCollisionSound() {
        // Only works if AudioContext is running (after user clicked the button)
        synth.triggerAttackRelease("C4", "8n");
      }

      //========================================================
      // EVENT LOGGING
      //========================================================
      const eventLog = document.getElementById('eventLog');
      function logEvent(msg) {
        const now = new Date().toLocaleTimeString();
        eventLog.textContent += `\n[${now}] ${msg}`;
        eventLog.scrollTop = eventLog.scrollHeight;
      }

      // Handle window resizes
      window.addEventListener('resize', onWindowResize, false);
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  </script>
</body>
</html>
