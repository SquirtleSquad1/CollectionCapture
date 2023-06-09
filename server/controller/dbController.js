import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const dbController = {

  loginUser: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username
        }
      })
      if (user.password === password) {
        res.locals.userId = user.id;
        res.locals.status = 200;
      } else {
        res.locals.userId = ''
        res.locals.status = 401;
      }
      return next()
    }
    catch (err){
      return next({message: 'error in getUser middleware'})
    }
  },

  signupUser: async (req, res, next) => {
    const {username, password} = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username
        }
      })

      // does not fining a user acutally return a null value? 
      if (!user) {
        await prisma.user.create({
          data: {
            username: username,
            password: password
          }
        })
      }

    }catch (err){
      console.log(err)
      return next("error in postUser middleware")
    }
  },

  postCard: async (req, res, next) => {
    const { userId } = req.session
    console.log('cehcking session', req.session)
    const { cardId, imageUrl, cardName } = req.body;
    console.log(req.body)
    try {
      const card = await prisma.card.findUnique({
        where: {
          id: cardId
        }
      })
      console.log('card', card)
      if (!card) {
        const newCard = await prisma.card.create({
          data: {
            id: cardId,
            imageUrl,
            name: cardName,
            users: {
              create: [
                {
                  quantity: 1,
                  user: {
                    connect: {
                      id: userId
                    }
                  }
                }
              ]
            }
          }
        })
        console.log('Made new card', newCard)
        // return next({message: newCard});
      } else {
        const userAndCard = await prisma.collection.upsert({
          create: {
            userId: userId,
            quantity: 1,
            cardId: cardId,
          },
          update: {
            quantity: {
              increment: 1
            }
          },
          where: {
            userId_cardId: {
              userId: userId,
              cardId: cardId
            }
          }
        })

        // await prisma.collection.update({
        //   where: {
        //     userId_cardId: 
        //   }
        // })
      }

      return next();
    } catch (e) {
      console.log(e)
      return next({message: 'error in postCard middleware'})
    }

  },

  getCollection: async (req, res, next) => {
    //get user_id from req.cookie
    const user_id = req.session.userId
    console.log(user_id)
    //search database for dekcs that belong to user w/ prisma
    try {
      const decks = await prisma.collection.findMany({
        include: {
          card: true,
        },
      });

      //save cards to res.locals
      res.locals.decks = decks
      return next()
    }

    catch (error) {
      console.log('getCollection', error)
      return next(error) // corrected
    }
  },

  getDecks: async (req, res, next) => {
    //get user_id from req.cookie
    const user_id = req.body.userId
    //search database for dekcst hat belong to user w/ prisma
    try {
      const decks = await prisma.decks.findMany({
        where: {
          user_id: {
            equals: user_id
          },
        },
      })
      //save decks to res.locals

      return next()
    }

    catch (error) {
      return next(error)
    }
  },

  getDeck: async (req, res, next) => {
    //get user_id from req.cookie
    //get deck id from req.body
    const user_id = req.body.userId
    const deck_id = req.body.deckId
    //search database for dekcst hat belong to user w/ prisma
    try {
      const decks = await prisma.decks.findMany({
        where: {
          user_id: {
            equals: user_id
          },
          deck_id: {
            equals: deck_id
          }
        },
      })
      //save cards to res.locals

      return next()
    }

    catch (error) {
      return next(error)
    }
  },

}

export default dbController;
