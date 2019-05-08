import './../scss/main.scss';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

import * as functions from './functions.js';

window.onload = () =>{
	// Buttons
	let quickAddBtn = document.getElementById('QuickAdd');
	let quickAddFormDiv = document.getElementsByClassName('quickaddForm')[0];
	let cancelBtn = document.getElementById('Cancel');
	let AddBtn = document.getElementById('Add');
	let ViewBtn = document.getElementById('View');
	let Detail = document.getElementById('Detail');

	// Divs etc.
	let addBookDiv = document.getElementsByClassName('addbook')[0];

	// display the form field
	const displayForm = fromEvent(quickAddBtn, 'click');
	displayForm.subscribe((e) => {
		quickAddFormDiv.style.display = "block";
		addBookDiv.style.display = 'none';
		document.getElementById('view').style.display = 'none';
	},
		(err) => {
			JSON.parse({
				err: err
			})
		});

	// disappare the form field
	const cancelForm = fromEvent(cancelBtn, 'click');
	cancelForm.subscribe((e) => {
		quickAddFormDiv.style.display = "none";
	},
		(err) => {
			JSON.parse({
				err: err
			})
		});

	// add people
	const addPeople = fromEvent(AddBtn, 'click');
	addPeople.subscribe(() => {
		functions.addToBook();
	},
		(err) => {
			JSON.parse({
				err: err
			})
		});

	// remove or show detail.
	const remove_detailContact = fromEvent(addBookDiv, 'click');
	remove_detailContact.subscribe((e) => {
		if (e.target.classList.contains('delbutton')) {
			// functions.removeEntry(e);
		} else {
			functions.showDetail(e);
		}
	},
		(err) => {
			JSON.parse({
				err: err
			})
		});


	// show the address list
	const View = fromEvent(ViewBtn, 'click');
	View.subscribe(() => {
		functions.showPartofAddressBook();
	},
		(err) => {
			JSON.parse({
				err: err
			})
		});
}


