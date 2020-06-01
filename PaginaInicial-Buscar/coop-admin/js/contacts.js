function setContact(contact) {
			var contactRow = document.createElement('tr');
			
			var image = document.createElement('img');
			image.src = contact.picture.medium;
			image.alt = "profile";

			var t1 = document.createElement('td');
			t1.appendChild(image);

			var t2 = document.createElement('td');
			t2.appendChild(document.createTextNode(contact.id.value));

			var t3 = document.createElement('td');
			t3.appendChild(document.createTextNode(contact.name.first + " " + contact.name.last));

			var t4 = document.createElement('td');
			t4.appendChild(document.createTextNode(contact.email));

			var t5 = document.createElement('td');
			t5.appendChild(document.createTextNode(contact.cell));

			contactRow.appendChild(t1)		
			contactRow.appendChild(t2)		
			contactRow.appendChild(t3)		
			contactRow.appendChild(t4)		
			contactRow.appendChild(t5)		
			
			document.getElementById("card-content").appendChild(contactRow); 
		}

fetch("https://randomuser.me/api/?results=15")
      .then(response => response.json())
      .then(data => {
  		data.results.map(contact => {
  			setContact(contact);	
  		});
});