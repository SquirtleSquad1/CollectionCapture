import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()

module.exports = {

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