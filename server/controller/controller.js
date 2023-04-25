import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

export default {

  postCard: async (req, res, next) => {
    const { userId, cardId, imageUrl } = req.body;

    try {
      const card = await prisma.card.findUnique({
        where: {
          id: cardId
        }
      })

      if (!card) {
        const newCard = await prisma.card.create({
          data: {
            id: cardId,
            imageUrl,
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

        console.log(userAndCard)
        // await prisma.collection.update({
        //   where: {
        //     userId_cardId: 
        //   }
        // })
      }

      return next();
    } catch (e) {
      console.log(e)
      return next("error in postCard middleware")
    }

  },

  getCollection: async (req, res, next) => {
    //get user_id from req.cookie
    const user_id = req.body.userId
    //search database for dekcs that belong to user w/ prisma
    try {
      const decks = await prisma.user_cards.findMany({
        where: {
          user_id: {
            equals: user_id
          },
        },
      })
      //save cards to res.locals
      res.locals.decks = decks
      return next()
    }

    catch (error) {
      return next(error)
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
