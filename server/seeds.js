import { Tasks } from '/imports/collections'

let seeds = () => {
  
  if(Tasks.find({}).count() === 0){
    let tasks = [
      { text: 'A hundred reasons why Meteor is great!' },
      { text: 'Why you should learn GraphQL with Apollo.' },
      { text: 'React has a promising future.' },
    ]

    console.log(`Seed database with tasks.`)

    tasks.map((task) => {
      Tasks.insert(task)
    })
  }
}

export default seeds
