/**
 * TODO Your code goes below here!
 * You may find the helper functions helpful.
 */

let saved;
let temp;

fetch('https://cs571.org/s23/hw3/api/students', {
	method: "GET",
	headers: {
		"X-CS571-ID": "bid_c49825b5bd469d794555"
	}
})
.then((response) => response.json())
.then((data) => {
	saved = [...data];
	console.log(data);
	document.getElementById("students").innerHTML = buildStudentsHtml(data);
})
.catch(error => console.error(error));




document.getElementById("search-btn").addEventListener("click", () => {
	let nameIn = document.getElementById("search-name").value.toUpperCase().trim();
	let majorIn = document.getElementById("search-major").value.toUpperCase().trim();
	let interestIn = document.getElementById("search-interest").value.toUpperCase().trim();

	temp = saved.filter(stud => {
		let full = stud.name.first + " " + stud.name.last;
		return(full.toUpperCase().includes(nameIn) &&
		stud.major.toUpperCase().includes(majorIn) &&
		stud.interests.some(i => i.toUpperCase().includes(interestIn)));
	});
	console.log(temp);
	document.getElementById("students").innerHTML = buildStudentsHtml(temp);
})



document.getElementById("reset-search-btn").addEventListener("click", () => {
	document.getElementById("search-name").value = null;
	document.getElementById("search-major").value = null;
	document.getElementById("search-interest").value = null;
	document.getElementById("students").innerHTML = buildStudentsHtml(saved);
})





/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class = "col-xs-12 col-sm-6 col-md-4 col-lg-3  col-xl-2">`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<h4>${stud.major}</h4>`;
	html += `<h4>${stud.name.first} is taking ${stud.numCredits} credits and `;
	if(stud.fromWisconsin){
		html += `is from Wisconsin.</h4>`;
	}
	else{
		html += `is not from Wisconsin.</h4>`;
	}
	html += `<h4>They have ${stud.interests.length} interests including...</h4><ul>`;
	stud.interests.forEach(interest => html += `<li>${interest}</li>`);
	html += `</ul></div>`
	return html;
}

