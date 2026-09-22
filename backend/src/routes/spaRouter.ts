import express, { Express } from 'express'
import path from 'path'
import fs from 'fs'

export function configureSpaRouting (app: Express): void {
  const publicDir = path.join(process.cwd(), 'public')

  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir))

    app.get('/*any', (req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next()
      }

      if (req.path.startsWith('/api') || req.path.startsWith('/webhooks')) {
        return next()
      }

      res.sendFile(path.join(publicDir, 'index.html'), err => {
        if (err) {
          next(err)
        }
      })
    })
  }
}
