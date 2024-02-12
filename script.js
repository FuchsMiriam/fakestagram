let posts = [
    {
        'author': 'Visit Scotland',
        'image': './img/schottland.jpg',
        'location': 'Edinburgh, Schottland',
        'description': '🏴󠁧󠁢󠁳󠁣󠁴󠁿✨ Tauchen Sie ein und entdecken Sie die zehn schönsten Orte in Schottland! Von majestätischen Burgen bis zu atemberaubenden Landschaften - diese Reise wird Ihr Herz erobern. 🏰🏞️ #Schottland #Reiseziele #Entdeckung #Abenteuer 🌍',
        'comments': []
    },
    {
        'author': 'Miriam Fuchs',
        'image': './img/cooking.jpg',
        'location': 'Taunusstein, Deutschland',
        'description': '🥟👩‍🍳 Lust auf köstliche Teigtaschen, ohne viel Aufwand? 🌟 Entdecken Sie, wie einfach es ist, diese Leckereien zuzubereiten und Ihre Geschmacksknospen zu verwöhnen! 🍽️💫 #Kochtipps #Teigtaschen #Genusspur 🌮👌',
        'comments': []
    },
    {
        'author': 'Tarou Yamada',
        'image': './img/zeitung.jpg',
        'location': 'Frankfurt, Deutschland',
        'description': '📰📈 Studie zeigt: Wieder mehr Menschen greifen zur Tageszeitung! 🗞️💼 Erfahren Sie, warum dieses traditionsreiche Medium wieder an Beliebtheit gewinnt und welche Vorteile es bietet. 📊🤓 #Tageszeitung #Medien #Informationsquelle 🗞️🔍',
        'comments': []
    },
    {
        'author': 'Vogelschutzverein Musterstadt',
        'image': './img/birdFeeder.jpg',
        'location': 'Musterstadt, Deutschland',
        'description': '🐦❄️ Unterstützen Sie Vögel durch die Winterzeit mit schmackhaften Snacks! Entdecken Sie einfache Möglichkeiten, wie Sie unseren gefiederten Freunden helfen können, diese kalte Jahreszeit zu überstehen. 🥜🐦 #Vogelfütterung #Winterhilfe #Naturliebe 🌿🕊️',
        'comments': []
    },
    {
        'author': 'Kleinkunstverein Wiesbaden',
        'image': './img/saxophon.jpg',
        'location': 'Wiesbaden, Deutschland',
        'description': '🎷🎶 Große Neuigkeiten für Musikliebhaber: Candy Dulfer kommt im April für ein Konzert nach Deutschland! 🎵🎉 Seien Sie dabei, wenn diese Jazz-Ikone die Bühne rockt und für unvergessliche Momente sorgt. 🎤🎶 #CandyDulfer #Konzert #LiveMusik 🎷',
        'comments': []
    },
    {
        'author': 'Smart & Fit',
        'image': './img/sport.jpg',
        'location': 'New York, USA',
        'description': '💪🏼🧠 Besiegen Sie den inneren Schweinehund und erreichen Sie Ihre Ziele! 🏋🏽‍♀️🎯 Erfahren Sie, wie Sie Ihre Motivation steigern und Hindernisse überwinden, um erfolgreich zu sein. 🌟 #Motivation #Zielsetzung #Erfolg 💼🚀',
        'comments': []
    }
];


loadComments();


function show() {
    document.getElementById('postContainer').innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let liked = localStorage.getItem(`liked${i}`) === 'true';
        let postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
        <div class="postHeader">
          <div class="postHeaderItem"><b>${post['author']}</b></div>
          <div class="postHeaderItem recText">${post['location']}</div>
        </div>
        <img class="postImages" src="${post['image']}">
        <div class="likeSection">
          <img class="heart" src="${liked ? './img/liked.png' : './img/like.png'}" alt="${liked ? 'Liked' : 'Like'}" onclick="imageChange(${i})" id="likeImage${i}">
          <div class="likeText"><span>Gefällt&nbsp;</span>
          <span class="likeCounter" id="likeCounter${i}">${liked ? '1' : '45'}</span>
          <span>&nbsp;Mal</span></div>
        </div>
        <div class="postDescription">${post['description']}</div>
        <div id="commentContainer${i}"></div>
        <form onsubmit="addComment(${i}); return false;">
          <div class="commentBox">
            <input required type="text" id="input${i}" placeholder="Kommentar hinzufügen ...">
            <button type="submit">Posten</button>
          </div>
        </form>
      `;
        document.getElementById('postContainer').appendChild(postDiv);
        showComment(i);
    }
}


function imageChange(i) {
    let imageElement = document.getElementById(`likeImage${i}`);
    let counterElement = document.getElementById(`likeCounter${i}`);
    let count = parseInt(counterElement.textContent) || 45;

    if (imageElement.src.endsWith('like.png')) {
        imageElement.src = './img/liked.png';
        imageElement.alt = 'Liked';
        count += 1;
        counterElement.textContent = count;
        localStorage.setItem(`liked${i}`, 'true');
    } else {
        imageElement.src = './img/like.png';
        imageElement.alt = 'Like';
        count -= 1;
        counterElement.textContent = count > 0 ? count : '';
        localStorage.removeItem(`liked${i}`);
    }
}



function addComment(i) {
    let comment = document.getElementById(`input${i}`).value;
    posts[i].comments.push(comment);
    saveArrayToLocalStorage('posts', posts);

    showComment(i);
    document.getElementById(`input${i}`).value = ``;

}


function showComment(i) {
    let commentContainer = document.getElementById(`commentContainer${i}`);
    commentContainer.innerHTML = '';
    for (let j = 0; j < posts[i].comments.length; j++) {
        let newCommentDiv = document.createElement('div');
        newCommentDiv.innerHTML = `<div class="commentContainer">${posts[i].comments[j]} <a class="deleteButton" href="#" onclick="deleteComment(${i}, ${j}, event)">X</a></div>`;
        commentContainer.appendChild(newCommentDiv);
    }
}


function deleteComment(i, j, event) {
    event.preventDefault();

    posts[i].comments.splice(j, 1);
    saveArrayToLocalStorage('posts', posts);
    showComment(i);
}


function saveArrayToLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}


function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}


function loadComments() {
    const storedPosts = getArray('posts');
    if (Array.isArray(storedPosts)) {
        posts = storedPosts;
    }
}


