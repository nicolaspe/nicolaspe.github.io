<!--
title: "Coalition"
date:  "2018-12-15"
display: true
image: "img/portfolio/coalition.png"
weight: 1
-->

# Coalition

<mark>A motion-based interactive experience about diversity in an oppressive society.</mark>
<!--more-->
Made in collaboration with [Ridwan Madon](https://www.ridwanmadon.com/), [Xiaowei Lu](https://wp.nyu.edu/llllllxw/author/xl2334/) and [Yibing Qian](http://yibingqian.org/).

<div style="width: 80%; margin-left: auto; margin-right: auto;">
<figure class="vid_container vid_16x9 vid_ext" style="text-align: center">
  <iframe src="https://www.youtube.com/embed/mPhG_J-Jd5M" frameborder="0" allow="accelerometer; encrypted-media; gyroscope" allowfullscreen></iframe>
</figure>
</div>

## Concept

Coalition is an exploration of motion as expression of individuality and the struggle against oppressive societies. It is an immersive live experience that represents the union of motion and sound conveying individuality and uniqueness against the status quo of society.

<div class="line-group">

We see motion as a form of expression, which conveys individuality and emotions. When placed in the context of its environment, this uniqueness and diversity will often be met with resistance, as society as a whole prefers to maintain the status-quo. This oppression has long lasting direct and side effects on communities, and is ever present in our times. But where as individuals, we are powerless against society, as we unite we aim and thrive for the common good.

<figure class="proj_img proj_img_tall" style="text-align: center; width: 40%;">
  <img class="p_capture" src="./media/coalition_poster.jpg" alt="Coalition poster">
  <figcaption>Coalition poster for the exhibition @ NYU Tandon</figcaption>
</figure>

</div>

## Capturing movement

To illustrate diversity in a movement-based experience, we selected dances from four different cultures. In this sense, the minorities we showcase represent the oppressed migrant communities around the world, struggling to make a home in a new place.

Using NYU's [OptiTrack](https://www.optitrack.com/) motion capture system, we recorded each of the dances in different forms, letting us seamlesly move between states depending on the user input.

<figure class="vid_container vid_720" style="text-align: center">
    <video class="vid_doc" autoplay loop>
        <source src="./media/bim_mocap.mp4" t ype="video/mp4">
        <!-- <source src="./media/bim_mocap.webm" type="video/webm"> -->
    </video>
</figure>
<figcaption>Motion capture recording session and retargeting in MotionBuilder</figcaption>

## Motion Controllers

<div class="line-group">

<figure class="proj_img proj_img_sideR" style="text-align: center">
    <img class="p_detail" style="width:45%" src="./media/coalition_baton.gif" alt="Baton controller">
    <img class="p_detail" style="width:45%" src="./media/coalition_ribbon.gif" alt="Ribbon controller">
</figure>

In order to promote movement from the audience which we could track, we relied on physical controllers. Our research showed that people were more willing to move when they had an implement at ther disposal. Thus, we 3d modeled and printed two different controllers, fashioned after rhythmic gymnastics tools: a baton and a ribbon. The spherical blobs on the top were covered with reflective tape to be tracked by the OptiTrack system.

</div>

<div class="line-group" style="margin-top: -2em;">

These controllers house inside the components needed to communicate with the main computer via bluetooth, assigning a color to the controller. RGB LEDs would display this color on the middle section of the handle, matching the color and signaling the avatar each member of the audience controlled

<figure class="proj_img proj_img_sideR" style="text-align: center">
    <img class="p_detail" style="width: 75%;" src="./media/coalition_controller.jpg" alt="Finished controller with lights inside">
</figure>
</div>

## The environment

To accompany the dances from each culture, we crafted a digital environment containing objects and symbols characteristical to them. Each object would have the chance to appear on the environment depending on the avatars spawned by the users. This helped us further make the connections between the dances and the cultures they represent.

<figure class="proj_img proj_img_full" style="text-align: center">
  <img class="p_capture" src="./media/coalition_unreal.jpg" alt="Coalition environment in Unreal Engine">
	<figcaption>Coalition's virtual environment</figcaption>
</figure>

<!-- THE ROOM -->
<div class="line-group">

This virtual environment is projected on three walls of the installation. Layers of organza are hung to create more depth and enhance the immersion. Unfortunately, this material creates interference with the motion capture system, meaning we had to place them almost touching the walls.

<figure class="vid_side" style="text-align: center">
    <video style="width:80%;" autoplay loop muted>
        <source src="./media/bim_organza.mp4" type="video/mp4">
        <!-- <source src="./media/inst_organza.webm" type="video/webm"> -->
    </video>
</figure>
</div>

<br>

## User experience

In order to make the audience part of the projected virtual environment, each user spawns an avatar as soon as they start dancing with the controllers. As long as they keep dancing, their avatars will dance along, and it's up to them to choose the fate of their virtual dancer. Whether they just stop or choose to dance with someone else, the effect on the avatar -and the environment- will be different.

<figure class="proj_img proj_img_full" style="text-align: center">
  <img class="p_capture" src="./media/coalition_ux1.jpg" alt="Solo user experience">
  <br/>
  <img class="p_capture" src="./media/coalition_ux2.jpg" alt="Dual user experience">
	<figcaption>User experience diagrams -illustrated by Yibing Qian</figcaption>
</figure>

<br>

## Installation

This installation aimed to instigate a reflection on this issue by letting users explore a 3d environment via motion triggered by their own expression. We achieved that by making the audience become part of a diverse virtual community, represented by choreographies and sounds from different cultures. Through their own movements and interactions, they transformed this installation into an experience of awe and joy.

<figure class="vid_container vid_16x9 vid_ext" style="text-align: center">
  <iframe src="https://player.vimeo.com/video/327081816"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</figure>

[Download the PressKit here](./presskit.pdf)

<br>

<a href="#" onClick="history.go(-1);return true;">Go Back</a>
