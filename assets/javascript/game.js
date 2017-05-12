    var wins = 0;
    var loses = 0;
    // var firstTime = 1;

    var sndMiss = new Audio("assets/audio/Miss2.wav");
    var sndHit = new Audio("assets/audio/Hit.wav");
    var sndIntro = new Audio("assets/audio/TGBU-theme.wav");

    function newGame() {
        wins = 0;
        loses = 0;
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("loses").innerHTML = loses;

        hangMan();
    }



    function hangMan() {

        // if (firstTime === 1) {
        //     document.getElementById("firsttime").innerHTML = "Turn Volume Up";
        // } else {
        //     document.getElementById("firsttime").innerHTML = null;
        // }
        var guessWord = [];
        var gameWord = [];
        var guessesAllowed = 0;
        var letters = [];
        var guessLetter = [];
        var wordList = [
            "bagpipes", "blizzard", "bookworm", "buckaroo", "daiquiri", "dizzying", "embezzle", "fishhook", "flapjack", "flopping",
            "foxglove", "bayou", "blitz", "buxom", "crypt", "cycle", "equip", "haphazard", "flyby", "funny", "gabby", "gizmo",
            "bit", "nap", "mob", "out", "zoo", "onyx", "klutz", "banjo", "snazzy", "awkward", "rhubarb", "boxcar", "boxful", "caliph",
            "cobweb", "dirndl", "duplex", "euouae", "exodus", "faking", "galaxy", "gazebo", "buffalo", "buffoon", "buzzard", "buzzing",
            "croquet", "curacao", "disavow", "dwarves", "fixable", "fuchsia", "gnostic", "fluffiness", "grogginess", "iatrogenic",
            "jawbreaker", "razzmatazz", "stronghold", "thriftless", "thumbscrew", "transcript", "transgress", "transplant",
            "frizzled", "glowworm", "jaundice", "jazziest", "jiujitsu", "kilobyte", "knapsack", "mnemonic", "nowadays", "peekaboo",
            "puzzling", "glyph", "haiku", "ivory", "jazzy", "jelly", "juicy", "jumbo", "kayak", "kazoo", "khaki", "kiosk", "gnarly",
            "gossip", "hyphen", "icebox", "injury", "jigsaw", "jockey", "joking", "jovial", "joyful", "kitsch", "jackpot", "jaywalk",
            "jogging", "jukebox", "keyhole", "lengths", "marquis", "mystify", "naphtha", "oxidize", "quizzes", "kiwifruit", "megahertz",
            "microwave", "nightclub", "numbskull", "pneumonia", "strengths", "voyeurism", "xylophone", "yachtsman", "abruptly",
            "larynx", "luxury", "matrix", "oxygen", "pajama", "phlegm", "pizazz", "psyche", "quartz", "quorum", "rhythm", "lucky",
            "lymph", "nymph", "ovary", "pixel", "polka", "frazzled", "puppy", "queue", "quips", "staff", "quixotic", "rickshaw",
            "schnapps", "strength", "syndrome", "twelfths", "unworthy", "vaporize", "whizzing", "whomever", "youthful", "quiz",
            "shiv", "wave", "wavy", "waxy", "ivy", "car", "bee", "bin", "cry", "bet", "scratch", "stretch", "stymied", "twelfth",
            "unknown", "walkway", "whiskey", "absurd", "avenue", "bikini", "boggle", "sphinx", "spritz", "squawk", "subway", "swivel",
            "uptown", "voodoo", "vortex", "wheezy", "wizard", "wyvern", "topaz", "unzip", "vixen", "vodka", "waltz", "wimpy", "woozy",
            "yoked", "yummy", "zilch", "jinx", "triphthong", "wellspring", "witchcraft", "wristwatch", "zigzagging", "bandwagon",
            "beekeeper", "buzzwords", "cockiness", "espionage", "galvanize", "yippee", "zephyr", "zigzag", "zipper", "zodiac", "zombie",
            "abyss", "affix", "askew", "axiom", "azure"
        ];

        document.getElementById("word").innerHTML = null;
        gameWordPick = wordList[Math.floor(Math.random() * 221) + 0];
        for (var i = 0; i < gameWordPick.length; i++) {
            gameWord.push(gameWordPick[i]);
            guessWord.push("_");
            //-- count the unique letters in the gameWord
            if (letters.indexOf(gameWordPick[i]) === -1) {
                letters.push(gameWordPick[i]);
            }
        }
        var guessWordString = guessWord.toString();
        var guessWordClean = guessWordString.replace(/,/g, " ");

        document.getElementById("guessword").innerHTML = guessWordClean;
        document.getElementById("misses").innerHTML = null;

        var play = confirm("This game has audio so turn your volume up. Click cancel for Easy Play, OK for Normal Play.");

        if (play == true) {
            guessesAllowed = letters.length + 4; //-- dynamic +4 guesses allowed for normal play
        } else {
            guessesAllowed = letters.length + 8; //dynamic +8 guesses allowed for easy play
        }
        sndIntro.play();
        console.log('calculated guesses: ', letters.length);
        console.log(guessesAllowed);

        // console.log(gameWordPick);
        // console.log(gameWord);
        var gameWordString = gameWord.toString();
        var gameWordClean = gameWordString.replace(/,/g, "");

        document.getElementById("guesses").innerHTML = guessesAllowed;

        document.onkeyup = function(event) {
            console.log(event);
            var keyCode = event.keyCode;


            if (guessWord.indexOf('_') != -1 && guessesAllowed >= 0) {
                //-check for input for letters
                if (keyCode > 64 && keyCode < 91) {
                    var keyPress = event.key.toLowerCase();
                    if (gameWord.indexOf(keyPress) > -1 && guessWord.indexOf("_") > -1) {
                        sndHit.play();
                        var idx = gameWord.indexOf(keyPress);
                        guessesAllowed = guessesAllowed - 1;
                        // console.log(idx , "before while");
                        while (idx != -1) { //do while to catch double letter
                            guessWord.splice(idx, 1, keyPress);
                            idx = gameWord.indexOf(keyPress, idx + 1);
                            // console.log(idx , "after while");  
                        }
                        var guessWordString = guessWord.toString(); //guessWord.join();
                        var guessWordClean = guessWordString.replace(/,/g, " ");
                        document.getElementById("guessword").innerHTML = guessWordClean;
                        document.getElementById("guesses").innerHTML = guessesAllowed;
                    } else {
                        //-- this builds the array for letters used that are misses
                        if (guessLetter.indexOf(keyPress) === -1 && gameWord.indexOf(keyPress) === -1 && guessesAllowed != 0) {
                            sndMiss.play();
                            guessLetter.push(keyPress);
                            guessesAllowed = guessesAllowed - 1;

                            var guessLetterString = guessLetter.toString();
                            var guessLetterClean = guessLetterString.replace(/,/g, " ");
                            document.getElementById("guesses").innerHTML = guessesAllowed;
                            document.getElementById("misses").innerHTML = guessLetterClean;


                        } else if (guessesAllowed === 0) {
                            loses = loses + 1;
                            document.getElementById("loses").innerHTML = loses;
                            alert("You almost had it, try again. Your word was: " + gameWordClean);
                            // firstTime = 0;
                            hangMan();
                        } else {
                            console.log("you already used \'", keyPress, "\'.")
                        }
                    }
                } else {
                    alert('That was \"' + event.key + '\". Please click a letter instead.');
                }
                if (guessWord.indexOf('_') === -1 && guessesAllowed >= 0) {
                    // firstTime = 0;
                    alert("Congratulations! You escaped hanging. Your word was: " + gameWordClean);
                    wins = wins + 1;
                    document.getElementById("wins").innerHTML = wins;
                    hangMan();
                }

            }
        }
    }