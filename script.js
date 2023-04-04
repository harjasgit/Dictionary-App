const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const result = document.getElementById("result");
    const sound = document.getElementById("sound");
    const btn = document.getElementById("search-btn");


    btn.addEventListener("click", () => {
        let inpWord = document.getElementById("input-word").value;
        // alert(inpWord);
        fetch(`${url}${inpWord}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data[0]);
                result.style.display = "block";

                let word = data[0].word;
                let partsofspeech = data[0].meanings[0].partOfSpeech;
                let phonetic = data[0].phonetics[0].text;
                let definition = data[0].meanings[0].definitions[0].definition;
                let example =data[0].meanings[0].definitions[0].example
                let audio = data[0].phonetics[0].audio;

                // console.log(word);
                // console.log(partsofspeech);
                console.log(phonetic);
                // console.log(definition);
                // console.log(example);
                // console.log(word);

                result.innerHTML = `
            <div class="word">
                <h3>${word}</h3>
                ${
                    audio &&
                    `
                    <button
                     onclick="playSound()"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                </button>
                    `
                }
            </div>
            <div class="details">
                <p>${partsofspeech ? partsofspeech : ""}</p>
                <p>${phonetic ? phonetic : ""}</p>
            </div>
            <p class="word-meaning">
                ${definition ? definition : ""}
            </p>
            <p class="word-example">
               ${
                example ?
                `<span>"</span>${example}<span>"</span>`
                :
                ""
               }
</p>
            
            
            `

            if(audio){
                sound.setAttribute("src", audio)
            }
            })
            .catch((err) => {
                result.innerHTML = `<h3>Word not found</h3>`
                console.log(err);
            })
    })


    function playSound(){
        sound.play();
    }