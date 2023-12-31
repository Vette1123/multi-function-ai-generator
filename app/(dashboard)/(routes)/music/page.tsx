'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Music } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useProModal } from '@/hooks/use-modal'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Empty } from '@/components/empty'
import { Heading } from '@/components/heading'
import { Loader } from '@/components/loader'

import { formSchema, FormValues } from './constants'

function MusicPage() {
  const [music, setMusic] = useState<string>('')
  const proModal = useProModal()
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: FormValues) => {
    try {
      setMusic('')

      const response = await axios.post('/api/music', values)
      console.log(response)

      setMusic(response.data.audio)
      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error('Something went wrong.')
      }
    } finally {
      router.refresh()
    }
  }
  return (
    <>
      <Heading
        description="Turn your prompt into a music"
        title="Music Generation"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent dark:disabled:bg-transparent"
                      disabled={isLoading}
                      placeholder="A song about a dog"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 w-full lg:col-span-2"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!music && !isLoading && <Empty label="No music generated." />}
        {music && (
          <audio controls className="mt-8 w-full">
            <source src={music} />
          </audio>
        )}
      </div>
    </>
  )
}

export default MusicPage
