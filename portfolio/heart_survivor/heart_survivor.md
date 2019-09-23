<!--
title: "Heart of a Survivor"
date:  "2019-08-31"
display: true
weight: 1
-->

# Heart of a Survivor

Heart of a Survivor (working title) is the prototype for an unreleased festival-bound virtual reality experience, that takes the audience through a journey of loss, love and hope: the biographical story of a genocide survivor.

`As this is a yet-unreleased piece, I will not disclose specific details about the piece, instead focusing on the creative and technical journey.`

<figure class="proj_img proj_img_full" style="text-align: center">
	<img class="p_capture" src="./media/stayalive.png" alt="Heart Survivor, prototype scene">
</figure>

## Adapting screenplay

I worked alongside [Gabriel Brasil](https://www.ejectnow.com/), fellow technologist and art director, to take the script of this heart-wrenching story and transform it to an immersive VR piece. Being a new medium, VR doesn't have an established language as cinema or theatre. As such, it falls into the shoulders of us technologist to work alonside the writers and directors to adapt their scripts, showing them what's possible in this emerging environment and employing the full extent of the opportunities it provides.

<div class="line-group">
<mark class="sideR">The core questions when starting a VR experience: "Why is this in VR? How does it use its capabilities? Who is the user and what can the user do?"</mark>

<div>
  <figure class="vid_container vid_16x9" style="text-align: center">
    <iframe src="https://player.vimeo.com/video/358901555"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  </figure>
  <figcaption>Ideation session timelapse - edited by Gabriel Brasil</figcaption>
</div>

</div>

The script was thoroughly dissected and analyzed from several points of view: story beats and narrative structure, user placement and interaction possiblilities, technical elements and how they play along in VR, scene composition, and more. As an emotional and impactful story, all had to play in favor of a strong sense of embodiment, using the user's presence as a narrative tool.

At the same time, this was not meant to be a simulator or to replicate reality. Going through such memories gives us the chance of imprinting their emotional weight on the environment, ultimately directing the art-style. All these elements were then presented to the director, presenting her with options and feedback, and starting a collaborative iteration in order to accomplish her view.

## Designing interactions

As an inherently immersive medium, the realm of possibilities of user interactions in VR has to be aligned with the idea of embodiment. As such, they have to be carefully designed. The interactions have to be unobtrussive and transparent, as a mechanic cannot take the user out of the experience.

This can be achieved in two ways. First, we can take advantage of movements that come natural to us, such as grabbing or reaching out to things. Or second, we can incorporate one new action in the beginning of the experience, reinforcing it over the first minutes, so that it becomes natural for the audience and they don't have to actively think to perform it.

<figure class="vid_container vid_720_full" style="text-align: center">
    <video class="vid_doc" controls>
        <source src="./media/demo_interaction.mp4" type="video/mp4">
    </video>
</figure>
<figcaption>Reaching out for a memory object activates the scene</figcaption>

## Animatics

After designing the interactions, laying out the scenes via storyboarding and with the script in a good state, we moved forward to 2d animatics 

## Exploring pipelines for volumetric technologies

Early on in the process, it became evident that such a powerful and intimate story needed specialized elements to create a deep human connection. And even though motion capture and asset creation have come a long way, the subtleties of human microgestures are immensely difficult to replicate. Thus, we looked at different volumetric capture technologies, testing their assets and trying to manipulate them to out target look.

<!-- VOLUMETRIC CAPTURE TECH & TESTS -->
<br>

<div class="line-group">

<div class="vid_side" style="text-align: center">
  <figure style="margin: 0" >
    <video class="vid_doc" controls muted />
        <!-- <source src="./media/hs_volumetric.webm" type="video/webm"> -->
        <source src="./media/hs_volumetric.mp4"  type="video/mp4">
    </video>
</figure>
<figcaption style="margin-bottom: 0;">Test of a volumetric asset by 4DSViews with custom shaders materials to achieve a dreamy feel</figcaption>
</div>

First, we tested two different products from full 3d volumetric capture studios: [4DSViews' Holosys](https://www.4dviews.com/) and the [Microsoft's Mixed Reality Capture Studio (MRCS)](https://www.microsoft.com/en-us/mixed-reality/capture-studios). Despite achieving decent results in a short time, the degree of manipulation, reliability or costs of these solutions meant that we could not work with them. But they gave us a great view into the landscape of 3d volumetric capture and the possibilities it offers.

</div>

<!-- PHOTOGRAMMETRY AND POINT CLOUDS -->

### DepthKit in UnrealEninge

Finally, we moved to [DepthKit](https://www.depthkit.tv/), a fantastic 2.5d solution for volumetric capture. DepthKit has an existing plugin for Unity but there's not such a thing for Unreal Engine, so the first step was come up with a pipeline to import it reliably. It involved exporting the recordings as an OBJ sequence, importing them into Maya [with a plugin](https://www.highend3d.com/maya/script/obj-i-o-obj-sequences-import-export-for-maya), scaling, and rotating if needed, and exporting as an *alembic cache*. This proved to be effective, but the textures kept desynchronizing with the geometry cache. To solve it, I used *ffmpeg* to batch downscale the images and use the level sequencer to manipulate their playback.

<!-- Face transplant -->
<div class="line-group">

After managing to get the technology working, I started experimenting with mixed alternatives. As DepthKit only captures 2.5d, there are many considerations at the moment of filming not to break the user's immersion. As a body's performance can be replicated thanks to motion capture, the facial performance is harder to import without highly expensive tech. But a way to circumvent this issue is by capturing the actor's face with DepthKit, and transplanting their face into a 3d model. This alembic cache is then parented to the head bone of the asset and can be easily swapped both in blueprint and level sequencer.

<div class="vid_side" style="text-align: center">
  <figure style="margin: 0" >
    <video class="vid_doc" autoplay loop muted />
        <!-- <source src="./media/DK_face.webm" type="video/webm"> -->
        <source src="./media/DK_face.mp4"  type="video/mp4">
    </video>
</figure>
  <figcaption>Exploring possibilities: transplanting a facial performance into a 3d body</figcaption>
</div>

</div>

## Creating prototypes


## Acknowledgements

I would like to thank to all the amazing people I worked with:

- Victoria Bousis, Director and writer
- [Gabriel Brasil](https://www.ejectnow.com/), co-worker and
- [Todd Bryant](https://toddjbryant.com/) and the [RLab](https://www.rlab.nyc/)
- Matthew Niederhauser and John Fitzgerald, [Sensorium](https://www.sensorium.works/)
- [Chris Hall](https://www.chrissyelie.com/)
- Misha Zabranska

<a href="#" onClick="history.go(-1);return true;">\< Go Back</a>
