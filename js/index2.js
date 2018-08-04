document.addEventListener('DOMContentLoaded', function () {
	var source = 'http://10.103.130.114:8080/hls/khachuong2.m3u8';
	var video = document.querySelector('video');

	// For more options see: https://github.com/sampotts/plyr/#options
	// captions.update is required for captions to work with hls.js
	var player = new Plyr(video, { captions: { active: true, update: true, language: 'vi' } });

	if (!Hls.isSupported()) {
		video.src = source;
	} else {
		// For more Hls.js options, see https://github.com/dailymotion/hls.js
		var hls = new Hls();
		hls.loadSource(source);
		hls.attachMedia(video);
		window.hls = hls;

		// Handle changing captions
		player.on('languagechange', function () {
			// Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
			setTimeout(function () {return hls.subtitleTrack = player.currentTrack;}, 50);
		});
	}

	// Expose player so it can be used from the console
	window.player = player;
});