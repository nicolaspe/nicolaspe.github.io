<!--
title: "Inner Cadence"
date:  "2019-04-25"
display: true
image: "img/portfolio/innercadence.png"
weight: 1
-->

# Inner Cadence

An interactive video wall that captures and amplifies people’s characteristic movements, enhancing motion as a form of expression.<!--more-->

<figure class="vid_container vid_720_full" style="text-align: center">
    <video class="vid_doc" autoplay loop>
        <source src="./media/innercad_01.mp4" t ype="video/mp4">
        <source src="./media/innercad_01.webm" type="video/webm">
    </video>
</figure>

<br>

<mark>Movement is a form of expression that’s inherently linked to our identity</mark>

This is a concept that I've been trying to explore for quite some time. It conveys individuality and emotion: we can be identified by our gait, or infer someone’s mood by their pose. I want to maximize this expressiveness potential and explore ways of enhancing people’s movements. I want to foreground motion by separating it from the body, silhouette, features, or clothes, making people rethink how they build their identity and their relation to others.

## Movement capture

To capture movement data, I could rely on different technologies:
- [OptiTrack](https://www.optitrack.com/) Motion Capture studio
- [Microsoft Kinect v2](https://en.wikipedia.org/wiki/Kinect#Kinect_for_Xbox_One_(2013))
- Pose detection algorithms

Despite having access to a motion capture studio and it being the most reliable source of motion data, this option would have made it impossible to create an interactive installation. The process of installing the entire system is highly complex, and the studio itself does not provide a suitable location for the project. For pose detection algorithms, there are several alternatives, such as [CMU's OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose) and [tensorflow's PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet). These models have become increasingly reliable, can run in real-time given the proper computer and require just a webcam. But the data they provide is only 2d, same as the input they receive, limiting the information I could process. In order to get 3d data with a portable equipment, I decided to use a Kinect v2, which provides real-time skeletal tracking and depth perception.

<br>
<figure class="proj_img proj_img_full" style="text-align: center">
	<img class="p_capture" src="./media/ic_capture.jpg" alt="Left: Kinect v2 and computer setup. Right: Computer screen showing Kinect camera view and skeletal tracking">
</figure>
<figcaption>Studio setup for movement capture. With a Kinect v2 and openFrameworks, I captured more than 20 users for 30 seconds in different poses.</figcaption>

## Movement classification

Now, to classify the data I first need to normalize and select the relevant data it. Without normalization, the movement of a user closer or further away from the camera would be processed in a different manner, and the height of the person would take a much more important role. To solve this, I only took the orientation quaternion of each joint, using the position data only for replaying purposes.

The selection of relevant data comes from the need to evaluate and classify different types of movement. I.e: to analyze the movement of the arms, I won't take into account the legs. Thus, I created 7 joint sets from which I ended up using 3: arms, legs and spine.

<figure class="vid_container vid_sm vid_sq" style="text-align: center">
    <video class="vid_doc" autoplay loop muted />
        <source src="./media/km_arms.mp4" type="video/mp4">
        <!-- <source src="./media/km_arms.webm" type="video/webm"> -->
    </video>
</figure>
<figcaption>Processing sketch replaying the recorded data, highlighting the target joints for the arms classification</figcaption>

Finally, I formed batches of 60 frames with the corresponding orientation and angular velocity values for each set of joints. Bundling frames together is crucial for analyzing snippets of movement over time.

All of this was analyzed in Python, using [k-means](https://en.wikipedia.org/wiki/K-means_clustering) to create clusters for each movement type, extracting different characteristics across the recorded individuals. These clusters would later on be used for the real-time movement classfication.

<!-- ## Movement enhancement : Shaders & particles -->

## User tests & prototyping

<div class="line-group">
<mark class="sideR">An early user test involved a motion-detection Processing sketch to see how people interact when movement triggers the interaction.</mark>

<figure class="vid_side" style="text-align: center">
    <video class="vid_doc" autoplay loop muted>
        <source src="./media/test_granular.webm" type="video/webm">
        <source src="./media/test_granular.mp4" type="video/mp4">
    </video>
</figure>
</div>

<figure class="vid_container vid_sq vid_sm" style="text-align: center">
    <video class="vid_doc" autoplay loop muted>
        <source src="./media/early_test.webm" type="video/webm">
        <source src="./media/early_test.mp4"  type="video/mp4">
    </video>
    <figcaption>User testing the motion-reactive sketch. All the interactions were recorded with a both GoPro and a Kinect, in order to match the skeletal data to actual movements.</figcaption>
</figure>

By putting everything together, I created the first prototype, an interconnected application that consists in two steps: movement classification and movement enhancement.

<br>
<div class="vid_sm" style="display: flex;">
	<figure class="vid_container vid_720x2" style="text-align: center">
        <video class="vid_doc" autoplay loop muted width="40%">
            <source src="./media/test_rec01.webm" type="video/webm">
            <source src="./media/test_rec01.mp4" type="video/mp4">
        </video>
    </figure>
    <figure class="vid_container vid_720x2" style="text-align: center">
        <video class="vid_doc" autoplay loop muted width="40%">
            <source src="./media/test_scr01.webm" type="video/webm">
            <source src="./media/test_scr01.mp4" type="video/mp4">
        </video>
    </figure>
</div>
<figcaption>As the user approaches the installation, their movevment gets captured and classified.</figcaption>

<div class="vid_sm" style="display: flex;">
	<figure class="vid_container vid_720x2" style="text-align: center">
        <video class="vid_doc" autoplay loop muted width="40%">
            <source src="./media/test_rec02.webm" type="video/webm">
            <source src="./media/test_rec02.mp4" type="video/mp4">
        </video>
    </figure>
    <figure class="vid_container vid_720x2" style="text-align: center">
        <video class="vid_doc" autoplay loop muted width="40%">
            <source src="./media/test_scr02.webm" type="video/webm">
            <source src="./media/test_scr02.mp4" type="video/mp4">
        </video>
    </figure>
</div>
<figcaption>After getting their movement type classification, a corresponding visualization is chosen for them to interact with.</figcaption>

## Exhibition & results

Finally, I created a 3-part video wall that analyzes people’s characteristic movements, classifies and amplifies them, enhancing its expressiveness. Each wall is a single-user experience, and by placing the three walls next to each other, the audience will hopefully reflect and make connections between the repeating patterns that that arise between each other. This was exhibited at the Unfolded Realities showcase (organized and curated by me).

<figure class="proj_img proj_img_center" style="text-align: center; display: block;">
	<img class="p_detail" src="./media/techrider.png" alt="Floor plan for the exhibition installation"> 
    <figcaption>Floor plan for the exhibition installation</figcaption>
</figure>

<br>
<figure class="proj_img proj_img_full" style="text-align: center; display: block;">
	<img class="p_detail" src="./media/ic_unfoldedrealities.jpg" alt="Setting up the installation"> 
    <figcaption>Setting up the installation</figcaption>
</figure>

<br>
<figure class="vid_container vid_720_full" style="text-align: center">
    <video src="./media/innercad_02.webm" class="vid_doc" autoplay loop>
</figure>
<figcaption>Audience interacting with the project at Unfolded Realities</figcaption>

<a href="#" onClick="history.go(-1);return true;">\< Go Back</a>
