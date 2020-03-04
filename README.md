# sei-project-4

The idea behind the project:



Django backend:
Manipulating django's abract user model proved to be a challenge.
When making a "put" request onto the user model, we ran into a 422 error (unprocessable entity). It was requiring that the user username, email, password and password confirmation be resent. We did not want to insert a prompt midway through a game to ask for password and password confirmation, so we added context= "is_create" onto the user validation serializer that only required password and password confirmation on creation. We then added this context to the updated_user data that we sent in a patch request instead of a put request. We then added partial = true on the updated_user in order to forego the email and username information it was requesting.

React frontend:
We had to form a better understanding of spreading in order to send this patch request through on the front end to the correct part of the user model where we wanted to store the information (one business pk in the businesses array)

We had a serializer to populate the business model information when the user model is called for quick access to the business information when rendering the user profile. But this created an issue when trying to add more than one business to the businesses array on the user model. The view we had written for the patch request was expect a pk, not an object, so when we tried to send through the second pk, the first had populated as an object, and because we had spread the previous user information into state to re-send in the patch request, we were sending an array of one object and one pk. Django didn't like that! So we removed the serializer to populate the business model, and make a get request to the businesses url with the index of the businesses, taken from the user's array of businesses that held the pk of the business.

For the story, we originally only had one choice (with four results), which would spawn a particular button that would link to the corresponding page, and that page held the corresponding "luck score" in state. This was then passed down as a prop when we rendered the subsequent page within the page that the choice is made. 
This ended up changing when we added in an additional choice (with an additional four results) and decided to pass the score down as a prop from the beginning. But for the first choice, we pass through a score and text to the same page, simply displaying that text passed as a prop, making the page appear to be different when you made different choices. For the next choice, however, we passed down the score as a prop but needed more story text, so we did link through to four different pages depending on your second choice. From here, you begin your interview, which is rendered within the page and the score passed down to as a prop.

For the score, the player can accrue a maximum of 6 points: 2 from luck and 4 from the interview. The player must pass with a score of 4 in order to have a successful interview, meaning that they can miss out on the luck points but still pass if they answer every question correctly. Conversely, they can miss up to 2 interview questions but still pass if they had good luck. We feel that this game model accurately describes the sensation that many job-hunters experience, which is that landing your perfect job can take luck as much as skill.

Additional functionality:
The ability for users to leave comments on another user's page
Hide users from the search index if they check "privacy" as true on their profile edit page
use latitude and longitude of businesses to be able to display (using mapbox) their locations
