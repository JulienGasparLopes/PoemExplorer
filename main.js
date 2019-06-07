var POEM_TO_SET_AFTER_TRANSITION = "";
var CURRENT_POEM = "";
var POEM_HISTORY = [];
var ON_TRANS = false;

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
	var link = "<span class='link' onclick=switchPoem('" + word + "')>" + word + "</span>";
	
	return text.replace(reg, link);
}

function setPoem(word, backward=false){
	//init poem div
	poem.innerHTML = "";
	
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
	var textFake = document.createElement("h2");
	
	text.id = "text";
	textFake.id = "textFake";
	
	text.classList.add("hidden");
	
	text.innerHTML = poemText;
	textFake.innerHTML = poemText;
	
	poem.appendChild(text);
	poem.appendChild(textFake);
			
	//Show back button
	if(!backward && CURRENT_POEM.length > 0){
		POEM_HISTORY.push(CURRENT_POEM);
	}
	
	if(POEM_HISTORY.length > 0){
		back.style.opacity = 1;
	}
	else{
		back.style.opacity = 0;
	}
	back.onclick = (e) => {
		if(!ON_TRANS && POEM_HISTORY.length > 0){
			let poem = POEM_HISTORY.pop();
			switchPoem(poem, true);
		}
	}
	
	CURRENT_POEM = word;
}

function switchPoem(word, backward=false){
	if(!ON_TRANS){
		ON_TRANS = true;
				
		let textFake = document.getElementById("textFake");
		let text = document.getElementById("text");
		
		textFake.classList.add("hide");
		
		//Get poem text
		var poemText = getPoemFromWord(word);
		
		//Replace all words
		bdd.forEach(elem => {
			if(elem.word.toUpperCase() != word.toUpperCase()){
				poemText = replaceWordByLink(poemText, elem.word);
			}
		});
		
		text.innerHTML = poemText;
		text.classList.add("show");
		
		text.addEventListener("transitionend", () => {
			ON_TRANS = false;
			setPoem(word, backward);
		});
	}
}

window.onload = () => {
		/** ----- GLOBAL VARIABLES ----- **/
	var poem = document.getElementById("poem");
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
		
	back.addEventListener("transitionend", () => {
		if(back.style.opacity == 0)
			back.style.cursor = "default";
		else
			back.style.cursor = "pointer";
			
	});
	
	setPoem("start");
}