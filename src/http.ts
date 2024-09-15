import { Hono } from 'hono'
import { serve } from "@hono/node-server";
import axios from 'axios'

import { classify } from './classify'

export const HTTP_PORT = 3000

export const app = new Hono()

app.get('/', (c) => {
  return c.text('We support cors, please use POST /classify with body: {image: Uint8Array} or {image_url: string} and we will return the classification results with the follow struct: {results: [{label: string, probability: number}]}')
})

app.post("/classify", async (c) => {
   try {
    const {image, image_url} = await c.req.json() as {
        image?: Uint8Array
        image_url?: string
    }
    let data: Uint8Array
    switch (true) {
        case image !== undefined:
            data = image
            break
        case image_url !== undefined:
            const response = await axios.get(image_url, { responseType: 'arraybuffer' })
            data = response.data
            break
        default:
            throw new Error('No image provided')
    }
    const predictions = await classify(data)
    const results = predictions.map(p => ({
        label: p.className,
        probability: p.probability
    }))
    return c.json({results})
   } catch (error:any) {
    return c.json({error: error.message},{
        status: 400
    })
   }
})


serve({
    fetch: app.fetch,
    port: HTTP_PORT
})

console.log(`http server listening on port ${HTTP_PORT}`)


