import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { Configuration, OpenAIApi } from 'openai'

import { checkIsWithinLimit, incrementApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY as string,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, amount = 1, resolution = '512x512' } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured.', { status: 500 })
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 })
    }

    if (!amount) {
      return new NextResponse('Amount is required', { status: 400 })
    }

    if (!resolution) {
      return new NextResponse('Resolution is required', { status: 400 })
    }

    const freeTrial = await checkIsWithinLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 }
      )
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    })

    if (!isPro) {
      await incrementApiLimit()
    }

    return NextResponse.json(response.data.data)
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Server Error',
      { status: 500 }
    )
  }
}
