<!--
title: "Wireless Bijective FX"
date: "2013-12-11T00:00:00+00:00"
display: false
image: "img/portfolio/wbfx_diagram.png"
weight: 0
-->

# Wireless Bijective FX

Software based bijective multiple effects processor and hardware based wireless controller for live performances.
<!--more-->

In collaboration with [Aarón Montoya-Moraga](http://montoyamoraga.io/) for the course "Interactive Arts Workshop" (Professors: [Rodrigo Cádiz](http://www.rodrigocadiz.com/), [Patricio de la Cuadra](https://ccrma.stanford.edu/~pdelac/)).</p>

[GitHub repository](https://github.com/nicolaspe/wireless_bijective_fx)

<figure style="text-align: center">
	<img class="p_capture" width="45%" src="../imgs/wbfx/wbfx_diagram.png" alt="Project diagram">
	<figcaption>Project functionality diagram</figcaption>
</figure>

<br>

We made a software+hardware piece that enabled us to play an instrument each while affecting each other's sound. The data and audio processing for the two instruments was made in PureData. We programmed a looper, booster, echo and reverb for each instrument. Meanwhile, the controllers were Arduino-based, using XBee modules for wireless connectivity.

## Concept
The musician's control over they're own sound is widespread and easy to accomplish, but it is a collaborative variable that has not been widely explored. With this project, we wanted to explore the modification of each other musician's sound in live performances.

<br> <figure style="text-align: center">
	<img class="p_capture" width="45%" src="../imgs/wbfx/wbfx_arduino.png" alt="Arduino and XBee testing">
	<figcaption>Arduino and XBee testing</figcaption>
</figure>

<br> <figure style="text-align: center">
	<img class="p_capture" width="70%" src="../imgs/wbfx/wbfx_effects.png" alt="Project effects">
	<figcaption>Effects, communication and PureData sketch</figcaption>
</figure>


<br><a href="#" onClick="history.go(-1);return true;">Go Back</a>
