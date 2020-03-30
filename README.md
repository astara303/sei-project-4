# Let's Interview!
> A full-stack website that tells a story about interviewing for a position as a developer. Sign up and see if you pass the interview!

![](https://i.ibb.co/s372k5T/slideshow1.png)

For the final project, a classmate and I collaborated on a choose-your-own-adventure text-based game using React, Django, Python and PostgreSQL. When planning, we decided on building a many-to-many relationship between two models, which helped me understand more about tables and data models.

This project took one week to build and was made during our _[General Assembly](https://generalassemb.ly/)_ Software Engineering Immersive course.

You can visit the site _[here](https://lets-interview.herokuapp.com/)_.

## Tools and Skills

- JavaScript
- React.js
- HTML5
- CSS3
- Django
- Python
- ProsgreSQL
- jwt Authorization
- CSRF Prevention Tokens
- Bootstrap CSS Framework
- Insomnia
- Yarn
- Pip
- Heroku
- GitHub

My responsibilities included:
- Planning the models and their relationships in the back end.
- Creating the front-end React components and routing them or rendering them where appropriate in order to pass down the player’s score. The score is based on player choices and a degree of luck for every choice.
- Writing the story and the JavaScript to properly display the story choices.
- Learning how to work with the Bootstrap framework in order to construct a layout for the site.

## Usage

When not logged in, users have the option to view the index of site users on the "connect" tab routed through the nav bar, register, or login. 

Once logged in, users can click the button on the home page or the link in the nav bar to begin the story.

Before or after the story has been completed, the user may view and fill-out their user profile, which is routed on the nav bar.

## Functionality

__The Front End:__

The story begins with 2 components that are meant to immerse the user into the story while providing the additonal functionality of displaying "advertisements" in the form of outfits or cafes the user chooses from when playing out their story. These business advertisements are saved to the user profile. We added this feature to show that we appreciate that advertising can be immersive when on the web.

From there, the user is given a choice with four results: two good and two bad. The good result adds +1 to the score, where as the bas result adds 0. 

```
<>
  {((clicked && this.state.shortcutGood) || (clicked && this.state.detourGood)) &&
    <NearOffice
      choiceText={this.state.goodText}
      score={this.state.goodScore} />
  }
  {(clicked && this.state.shortcutBad) &&
    <NearOffice
      choiceText={this.state.shortcutBadText}
      score={this.state.badScore} />
  }
  {(clicked && this.state.detourBad) &&
    <NearOffice
      choiceText={this.state.detourBadText}
      score={this.state.badScore} />
  }
</>
```

The user is given another choice, with an addition four results that function as above but are routed to four different components, rather than the same component with the text passed down as a prop as shown above.

After the second choice, the user starts the "interview" (quiz) section of the game.

<img src="https://i.imgur.com/eyEP2fZ.png" width="400" height="250">

The user enters the quiz with a score of 0-2, and there are 4 interview questions which makes 6 the highest possible score. The user must score at least 4 points to pass the interview. The user can miss out on the luck points but still pass if they answer every question correctly. Conversely, they can miss up to 2 interview questions but still pass if they had good luck. We feel that this game model accurately describes the sensation that many job-hunters experience, which is that landing your perfect job can take luck as much as skill.

__The Back End:__

We planned our model extensively, though it did require some edits and migrations.

![](https://i.imgur.com/n31o3nh.png)

We created a many to many relationship between the users and business model, because there would be many users with many (two) businesses attached to each. And each business (eight total) would each have multiple users who chose that business during their story.

We ended up removing the questions model and including that data directly in the front end. We also did not use the comment relationship.

The back end was built using Django and PostgreSQL. We used TablePlus and Insomnia as tools for development.

## Successes

For this project, I combined my previous experience building a quiz with my new skills in PostgreSQL and Django to create data tables, models, and their relationships from scratch. I chose to work with a friend who is amazing at illustrations to bring the story to life. A big thank you to Abigail Foreman for being my partner on this project!

__Django Models__

It took me a while to wrap my head around a many-to-many relationship in Django. There is still so much to learn but I understand more now about the structure of the tables and rows of the models, and how temporary models are built between many-to-many relationships.

<img src="https://i.imgur.com/cdzIBKX.png" width="200" height="300">

I'm glad that we were able to accomplish manipulating Django's user model to reflect the website we needed, and that the user can update their user information from their profile easily. This requires all views, serializers and urls to be communicating. Having coded the back end in Express.js and Node.js previously, it helped me understand the relationships in comparison to Expresses' controllers and routers.

__Front End: Routing and Rendering__

Managing parent/child relationships in React can be tricky at times so I am pleased that we were able to create a website with so many components that successfully track the user's score through the game. I console.logged my heart out to make sure the user never missed out on collecting points. This in itself was a good lesson, because console.logging is more particular in React than in vanilla JavaScript.

<img src="https://i.imgur.com/oPhLHdB.png" width="400" height="300">

Going over and re-using some of the quiz logic I had written for my [//TODO:QUIZ](todo-quiz-app.herokuapp.com/) website, but this time to function with a back end we had written ourselves, really strengthened my knowledge of objects, arrays, spreading, and setting the data in state properly after receinging it from the back end, and displaying that information from state for the user in a way that always functions, ie, the questions are never repeated and the correct answer logged is always truly the correct answer.

```
componentDidMount() {
    const questionObj = {
      question: this.state.data[0].question,
      codeOne: this.state.data[0].codeOne,
      codeTwo: this.state.data[0].codeTwo,
      correctAnswer: this.state.data[0].correctAnswer,
      incorrectAnswers: this.state.data[0].incorrectAnswers
    }
    const combined = [...questionObj.incorrectAnswers]
    const combinedAnswers = [...combined, questionObj.correctAnswer].sort(() => Math.random() - 0.5)
    this.setState({ questionObj, combinedAnswers })
  }
```

__The Profile Error__

While demonstrating the quiz to a friend, we noticed that the profile threw an error if you tried to visit it before completing the story. After checking our errors, I realised it was because we were trying to map the business images onto the profile before the profile had loaded. To combat this, I wrote some logic into the profile page functions.

```
  //we call the getBusinesses function only if they have chosen both their outfit and cafe from the story
  componentDidMount = async () => {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/users/${payload}`)
      this.setState({ user: res.data })
      if (res.data.businesses.length === 2) {
        return this.getBusinesses()
      } else {
        return
      }
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //the user will only ever have 2 businesses attached to their model, so we call them here
  getBusinesses = async () => {
    try {
      const firstBusiness = await axios.get(`/api/businesses/${this.state.user.businesses[0]}`)
      const secondBusiness = await axios.get(`/api/businesses/${this.state.user.businesses[1]}`)
      this.setState({ firstBusiness: firstBusiness.data, secondBusiness: secondBusiness.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }
```

This code is more important than ever, now that the businesses have an error saving to the profile after we built the site for deployment (I discuss this at length in the Challenges section.)

## Challenges

<img src="https://i.imgur.com/WPXSXWi.png" width="250" height="300">

__The PATCH Request__

Manipulating Django's abract user model proved to be a challenge.
When making a "PUT" request onto the user model, we ran into a 422 error (unprocessable entity). It was requiring that the user username, email, password and password confirmation be sent. We did not want to insert a prompt midway through a game to ask for password and password confirmation, so we added context= "is_create" onto the user validation serializer that only required password and password confirmation on creation. We then added this context to the updated_user data that we sent in a PATCH request instead of a PUT request. We then added partial = true on the updated_user in order to forego the email and username information it was requesting.

We had to form a better understanding of spreading in order to send this PATCH request data to the corresponding empty array in the user model.

```
def patch(self, request, pk):

    try:            
        userAuth = JWTAuthentication.authenticate(self, request)
        user = request.user
        updated_user = UserSerializer(user, data=request.data, context={'is_create': False }, partial=True)
        if updated_user.is_valid():
  
          updated_user.save()
          return Response(updated_user.data, status=HTTP_202_ACCEPTED)
        return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
    except User.DoesNotExist:
        return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
```

We had a serializer to populate the business model information when the user model is called, for quick access to the business information when rendering the user profile. But this created an issue when trying to add more than one business to the businesses array on the user model. The view we had written for the PATCH request was expect a pk, not an object, so when we tried to send through the second pk, the first had populated as an object, and because we had spread the previous user information into state to re-send in the PATCH request, we were sending an array of one object and one pk. Django didn't like that! So we removed the serializer to populate the business model, and make a GET request to the businesses url with the index of the businesses, taken from the user's array of businesses that held the pk of the business.

<img src="https://i.imgur.com/3yiCEDu.png" width="625" height="325">

```
  //saves chosenBusiness into array without saving over the previous choice
  handleClick = (e) => {
    let clicked = this.state.clicked
    const id = e.target.name
    this.setState({ id })
    if (clicked === false) {
      clicked = true
      const chosenBusiness = this.state.businesses[id]
      const user = { ...this.state.user, businesses: [...this.state.user.businesses, chosenBusiness.id] }
      this.setState({ clicked, user })
    } else {
      return
    }
  }
```

Everything was fixed and PATCHing to the appropriate place. Then, after the code was build for distribution and deployed, this PATCh request stopped functioning properly. This was kind of heartbreaking. There seems to be an issue with the PATCH request and the CSRF token. We cleared all errors by working on this token but the functionality has not returned. So currently the businesses chosen during the story are NOT saved to the profile as they should be. I would definitely aim to fix this in the future.

## Key Learnings

- How to create a back end database using the Django framework and PostgreSQL. 
  - This required writing the code and functions in Python, paying close attention to indentations and method syntax.
  - The Django framework comes with a lot of built in functionality. This benefitted us greatly when creating our business model and seeds, or when creating an admin "super user" to explore the database through Django on our localhost development site. It was a struggle when it came to manipulating the Django user model, but this was a success after we learned how to manipluate the serializers and views appropriately.
  - It sunk in how tables, rows, columns, one-to-many and many-to-many relationships work in SQL.

- Don't be afraid of React's parent/child relationships.
  - There is always a way to send the data you need. This can be hard to see when first learning that information can only be sent from the parent to the child, and not vice-versa. But state can do wonders, as can passing down props and spreading in data you need when rendering a component within its parent.

- Get creative with componentDidMount.
  - It can be tough to know when to call functions in React after using vanilla JavaScript, but a combination of knowing how to use componentDidMount and event handlers really helps pages run smoothly. I would write functions that are called within the componentDidMount in order to streamline functionality.
  
- Rendering information from the back end is asynchronous, so prepare!
  - Sometimes this meant wrapping the section in an && statement:
  ```
  {(firstBusiness && secondBusiness) &&
          <>
        <Row className="justify-content-md-center">
            <Col md="auto">
              <Card style={{ width: '18rem' }}>
                <Card.Img className="business-image" variant="toptop" src={firstBusiness.image} alt={firstBusiness.name} />
                <Card.Body>
                  <Card.Title>{firstBusiness.name}</Card.Title>
                  <Card.Text>{firstBusiness.category}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md="auto">
              <Card style={{ width: '18rem' }}>
                <Card.Img className="business-image" variant="toptop" src={secondBusiness.image} alt={secondBusiness.name} />
                <Card.Body>
                  <Card.Title>{secondBusiness.name}</Card.Title>
                  <Card.Text>{secondBusiness.category}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
        </Row>
        </>
        }
  ```
  Or needed to include a line of code like this in the render function:
  ```
  if (!this.state.user) return null
  ```
  
- Tertiary statements are a life-saver!
  - I was stressed that friends who signed up to test our site were added to the index page with broken images, as they had not supplied a user image and we do not request one on the registration form. The fix was easier than I thought! I inserted this into the line that displays the user image on the index page:
  ```
  <Card.Img className="profile-image" variant="top" src={profile_image ? profile_image : 'https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?w=415'}/>
  ```
  Et voila! No more stress!

<img src="https://i.imgur.com/EOrE5A0.png" width="350" height="250">

## Needs Improvement

- I would like to include more information about the interview questions on the final story page or profile, for anyone who was confused about the correct answer.

- We have a boolean option on the user profile which is "privacy". The idea of this boolean is that they can check or uncheck it to be added to or removed from the user index and search page, which is viewable from the nav bar as "connect". However this functionality has not yet been implemented.

- It would be great to have a messaging service on the site, as the idea behind having the user index is that users can reach out to each other and find others who are job-hunting. The emails are currently listed on the profiles so users _could_ interact this way.

- The businesses chosen during the story are not saved to the profile as they should be. I discuss this in the Challenges section.

## Hello!

I'm an avid enjoyer of JavaScript. I would be so happy to discuss this project, or any of your JavaScript projects with you.
I am a big gaming nerd so feel free to share your games with me!
If you'd like to see more of my work or get to know a bit more about me, please check out my portfolio:

_[My Portfolio](https://astara303.github.io/portfolio/)_

Thank you for reading!