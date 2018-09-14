
(function () {
	'use strict';
	function TabSection (element) {
		this.element = element;
		this.article = this.element.getElementsByClassName('tabSectionArticle');
		this.p = this.element.getElementsByClassName('tabSectionArticle__p');
		this.h2 = this.element.getElementsByClassName('tabSectionArticle__h2');
		this.buttons = this.element.querySelectorAll('button');
		this.createButtons();
		this.hideByDefault();
	}

	TabSection.prototype.hideByDefault = function () {
		//Gömmmer alla artiklar förutom första (Desktop)
		const articles = this.article;
		loopAddAria(articles, 0, 'aria-disabled');

		//Gömmmer alla paragrafer förutom första (Mobil)
		const p = this.p;
		loopAddAria(p, 0, 'aria-disabled');
	};

	TabSection.prototype.createButtons = function () {
		const nav = document.createElement('nav');
		nav.className = 'tabSectionNav';
		const h2 = this.h2;
		const that = this;

		for (var i = 0; i < h2.length; i++) {
			//skapar tab knapparna (Desktop)
			const btn = document.createElement('button');
			btn.id = [i];
			btn.className = 'tabSectionNav__button';
			btn.innerHTML = h2[i].innerText;
			btn.addEventListener('click', function () {
				that.show(this);
			});
			nav.appendChild(btn);

			//wrapar h2 runt om en knapp (Mobil)
			const btn2 = document.createElement('button');
			btn2.id = [i];
			btn2.className = 'tabSectionArticle__button';
			btn2.innerHTML = h2[i].innerText;
			btn2.addEventListener('click', function () {
				that.show(this);
			});
			//ersätter innertext med knappen
			h2[i].replaceChild(btn2, h2[i].firstChild);
			//visar all knappar
			h2[i].classList.add('hide');
		}

		var section = this.element;
		section.insertBefore(nav, this.element.querySelector('article'));
		that.addActive();
	};

	TabSection.prototype.show = function (input) {
		//får input.id från knapp och hämtar alla objekt som den ska kolla emot och skickar sedan vidare det.
		const article = this.article;
		loopAddAria(article, input.id, 'aria-disabled');
		const p = this.p;
		loopAddAria(p, input.id, 'aria-disabled');
		const sectionButton = this.element.getElementsByClassName('tabSectionNav__button');
		loopAddAria(sectionButton, input.id, 'aria-expanded');
		const articleButton = this.element.getElementsByClassName('tabSectionArticle__h2');
		loopAddAria(articleButton, input.id, 'aria-expanded');
	};

	TabSection.prototype.addActive = function () {

		const sectionButton = this.element.getElementsByClassName('tabSectionNav__button');
		for (var i = 0; i < sectionButton.length; i++) {
			sectionButton[i].setAttribute('aria-controls', 'tabSectionArticle');
			if (i === 0) {
				sectionButton[i].setAttribute('aria-expanded', 'true');
			}
			else{
				sectionButton[i].setAttribute('aria-expanded', 'false');
			}
		}

		const articleButton = this.element.getElementsByClassName('tabSectionArticle__h2');
		for (var u = 0; i < articleButton.length; i++) {
			sectionButton[u].setAttribute('aria-controls', 'tabSectionArticle__p');
			if (u === 0) {
				articleButton[u].setAttribute('aria-expanded', 'true');
			}
			else{
				articleButton[u].setAttribute('aria-expanded', 'false');
			}
			const img = document.createElement('img');
			img.src = 'down.svg';
			img.className = 'tabSectionArticle__img';
			articleButton[u].appendChild(img);
		}
	};

	function loopAddAria (input, objektId, ariaAttribute) {
		//loopar igen och lägger till aria attribute beronde på vad som kommer in i funktionen.
		for (var i = 0; i < input.length; i++) {
			if (i === parseInt(objektId)) {
				input[i].setAttribute(ariaAttribute, ariaAttribute === 'aria-expanded' ? 'true' : 'false');
			}
			else{
				input[i].setAttribute(ariaAttribute, ariaAttribute === 'aria-expanded' ? 'false' : 'true');
			}
		}
	}

	var tabSections = document.getElementsByClassName('tabSection');
	for(var tabSection of tabSections) {
		new TabSection(tabSection);
	}

}());