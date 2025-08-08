document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('liveVideo');
    const scheduleTableBody = document.querySelector('#match-table tbody');
    const sections = document.querySelectorAll('.content-section');

    const m3u8Link = 'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8';

    function loadLiveStream() {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(m3u8Link);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = m3u8Link;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
        }
    }

    const allMatches = [
        // Group Stage
        { match: 1, date: '9 Sep', day: 'Mon', start: '6 PM', venue: 'Abu Dhabi', team1: 'Oman', team2: 'UAE' },
        { match: 2, date: '10 Sep', day: 'Tue', start: '6 PM', venue: 'Dubai', team1: 'India', team2: 'Pakistan' },
        { match: 3, date: '11 Sep', day: 'Wed', start: '6 PM', venue: 'Abu Dhabi', team1: 'Sri Lanka', team2: 'Hong Kong' },
        { match: 4, date: '12 Sep', day: 'Thu', start: '6 PM', venue: 'Dubai', team1: 'Bangladesh', team2: 'Afghanistan' },
        { match: 5, date: '13 Sep', day: 'Fri', start: '6 PM', venue: 'Abu Dhabi', team1: 'UAE', team2: 'India' },
        { match: 6, date: '14 Sep', day: 'Sat', start: '6 PM', venue: 'Dubai', team1: 'Pakistan', team2: 'Oman' },
        { match: 7, date: '15 Sep', day: 'Sun', start: '4 PM', venue: 'Abu Dhabi', team1: 'Hong Kong', team2: 'Bangladesh' },
        { match: 8, date: '15 Sep', day: 'Sun', start: '6 PM', venue: 'Dubai', team1: 'Afghanistan', team2: 'Sri Lanka' },
        { match: 9, date: '16 Sep', day: 'Mon', start: '6 PM', venue: 'Abu Dhabi', team1: 'India', team2: 'Oman' },
        { match: 10, date: '17 Sep', day: 'Tue', start: '6 PM', venue: 'Dubai', team1: 'Pakistan', team2: 'UAE' },
        { match: 11, date: '18 Sep', day: 'Wed', start: '6 PM', venue: 'Abu Dhabi', team1: 'Sri Lanka', team2: 'Bangladesh' },
        { match: 12, date: '19 Sep', day: 'Thu', start: '6 PM', venue: 'Abu Dhabi', team1: 'Afghanistan', team2: 'Hong Kong' },

        // Super Four Stage
        { match: 13, date: '20 Sep', day: 'Fri', start: '6 PM', venue: 'Dubai', team1: 'B1', team2: 'B2' },
        { match: 14, date: '21 Sep', day: 'Sat', start: '6 PM', venue: 'Dubai', team1: 'A1', team2: 'A2' },
        { match: 15, date: '23 Sep', day: 'Mon', start: '6 PM', venue: 'Abu Dhabi', team1: 'A2', team2: 'B1' },
        { match: 16, date: '24 Sep', day: 'Tue', start: '6 PM', venue: 'Dubai', team1: 'A1', team2: 'B2' },
        { match: 17, date: '25 Sep', day: 'Wed', start: '6 PM', venue: 'Dubai', team1: 'A2', team2: 'B2' },
        { match: 18, date: '26 Sep', day: 'Thu', start: '6 PM', venue: 'Dubai', team1: 'A1', team2: 'B1' },

        // Final
        { match: 19, date: '28 Sep', day: 'Sat', start: '6 PM', venue: 'Dubai', team1: 'Finalist 1', team2: 'Finalist 2' }
    ];

    function renderSchedule(matches) {
        scheduleTableBody.innerHTML = '';
        matches.forEach(match => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${match.match}</td>
                <td>${match.date}</td>
                <td>${match.day}</td>
                <td>${match.start}</td>
                <td>${match.venue}</td>
                <td>${match.team1}</td>
                <td>${match.team2}</td>
                <td><button class="watch-button" onclick="watchMatch('${match.team1} vs ${match.team2}')">Watch Live</button></td>
            `;
            scheduleTableBody.appendChild(row);
        });
    }

    window.filterSchedule = function(teamName) {
        const filteredMatches = allMatches.filter(match => 
            match.team1.includes(teamName) || match.team2.includes(teamName)
        );
        renderSchedule(filteredMatches);
        showSection('schedule-section');
    };

    window.showSection = function(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
        document.getElementById(sectionId).classList.add('active');

        if (sectionId === 'live-section') {
            loadLiveStream();
        } else {
            video.pause();
        }
    };

    window.watchMatch = function(matchTitle) {
        alert(`You are now watching ${matchTitle}.`);
        showSection('live-section');
    };

    renderSchedule(allMatches);
    showSection('schedule-section');
});

