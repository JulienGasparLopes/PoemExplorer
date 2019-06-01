var POEM_TO_SET_AFTER_TRANSITION = "";
var CURRENT_POEM = "";
var POEM_HISTORY = [];

var bdd =
[
	{
		word: "Start",
		text: "Commencement ..."
	},
	{
		word: "Commencement",
		text: "C'est une feuille vierge, blanche mais sans candeur<br>\
			Qui donne à une idée sa grandeur, son ampleur<br>\
			Un premier trait devient en l'espace d'une heure<br>\
			La concrétisation d'un début prometteur."
	},
	{
		word: "Grandeur",
		text: "Alexandre ou Néron, à jamais dans l'Histoire<br>\
			Auraient, s'ils l'avait pu, dévoré des empires.<br>\
			Ils étaient gargantuesques à faire peur aux martyrs<br>\
			Leur appétit de gloire et leur soif de pouvoir."
	},
	{
		word: "Candeur",
		text: "Dis papa, mais pourquoi dans le ciel c'est bleu clair<br>\
			Alors qu'ici la mer est d'un bleu si profond<br>\
			Que j'ai peur d'y noyer mes rêves et mon ourson ?<br>\
			Je n'aime pas cette couleur, moi je préfère le vert !"
	},
	{
		word: "Premier",
		text: "Je l'ai déjà rêvé notre premier baiser<br>\
			Alors même que pour toi je ne suis qu'un prénom<br>\
			Une idée vagabonde que l'on pourrait chasser<br>\
			Mais tu sais mes images sont bien trop entêtées."
	},
	{
		word: "Moi",
		text: "C'est lui qui me souffle les mots et les caresses<br>\
			Lui aussi qui m'inspire les pires bassesses<br>\
			Il se rit de mes peurs et de mes maladresses<br>\
			Il est mon curateur et la voix qui m'oppresse."
	}
];
	
//Auto set texts on center of the screen
function resize() {
	poem.style.left = Math.floor(window.innerWidth/2 - poem.offsetWidth/2) + "px";
	poem.style.top = Math.floor(window.innerHeight/2 - poem.offsetHeight/2) + "px";
	next.style.left = Math.floor(window.innerWidth/2 - next.offsetWidth/2) + "px";
	next.style.top = Math.floor(window.innerHeight/2 - next.offsetHeight/2) + "px";
	back.style.left = Math.floor(window.innerWidth/2 - back.offsetWidth/2) + "px";
	back.style.transform = "translateY(" + window.innerHeight*3/4 + "px)";
}

function goToPoem(word, backward=false){
	if(POEM_TO_SET_AFTER_TRANSITION == ""){
		back.style.display = "none";
		
		//Set new text
		var text = document.createElement("h2");
		var newPoem = getPoemFromWord(word);
		bdd.forEach(elem => {
			if(elem.word.toUpperCase() != word.toUpperCase()){
				newPoem = replaceWordByLink(newPoem, elem.word);
			}
		});
		text.innerHTML = newPoem;
		next.appendChild(text);
		
		resize();
		
		poem.classList.add("hide");
		next.classList.add("show");
		
		POEM_TO_SET_AFTER_TRANSITION = word;
		
		if(!backward){
			POEM_HISTORY.push(CURRENT_POEM);
		}
	}
}

//Get text of a word in db (WARNING : can return null)
function getPoemFromWord(word){
	var ret = null;
	bdd.forEach((elem) =>{
		if(elem.word.toUpperCase() == word.toUpperCase()){
			ret = elem.text;
		}
	});
	return ret;
}

//Replace a word by a link to the goToPoem function
function replaceWordByLink(text, word){
	var reg = new RegExp(word, 'gi');
	var link = "<span class='link' onclick=goToPoem('" + word + "')>" + word + "</span>";
	
	return text.replace(reg, link);
}

function setPoem(word){
	//init poem div
	poem.innerHTML = "";
	poem.classList.remove("hide");
	
	//Get poem text
	var poemText = getPoemFromWord(word);
	
	//Replace all words
	bdd.forEach(elem => {
		if(elem.word.toUpperCase() != word.toUpperCase()){
			poemText = replaceWordByLink(poemText, elem.word);
		}
	});
	
	//Set new text
	var text = document.createElement("h2");
	text.innerHTML = poemText;
	poem.appendChild(text);
	
	//Show back button
	console.log(POEM_HISTORY)
	if(POEM_HISTORY.length > 0){
		back.style.display = "block";
	}
	else{
		back.style.display = "none";
	}
	back.onclick = (e) => {
		if(POEM_TO_SET_AFTER_TRANSITION == ""){
			let poem = POEM_HISTORY.pop();
			goToPoem(poem, true);
		}
	}
	
	CURRENT_POEM = word;
}


//Function called when transition is done to set 
//the next poem as the current poem
function onTransitionEnd(){
	setPoem(POEM_TO_SET_AFTER_TRANSITION);
	next.innerHTML = "";
	next.classList.remove("show");
	poem.classList.remove("hide");
	
	resize();
	
	POEM_TO_SET_AFTER_TRANSITION = "";
}

window.onload = () => {
		/** ----- GLOBAL VARIABLES ----- **/
	var poem = document.getElementById("poem");
	var next = document.getElementById("next");
	var back = document.getElementById("back");

	let homeContainer = document.getElementById("homeContainer");
	let poemContainer = document.getElementById("poemContainer");
	let homeTitle = document.getElementById("homeTitle");
	let homeSubtitle = document.getElementById("homeSubtitle");
	let homeTitleFooter = document.getElementById("homeTitleFooter");
	
	
	/** ----- ----- Main Program ----- ----- **/
	homeTitle.style.opacity = 1;
	homeSubtitle.style.opacity = 1;
	homeTitleFooter.style.opacity = 1;
	homeTitleFooter.style.transform = "translate(-100px)";
	poemContainer.style.opacity = 1;
	homeContainer.style.opacity = 0;
		
	window.onresize = () => resize();
	next.addEventListener("transitionend", onTransitionEnd);

	setPoem("start");
	resize();
}