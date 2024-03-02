'use client'
import { Agency } from '@prisma/client'
import { NumberInput } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertDialog } from '../ui/alert-dialog'
import {zodResolver} from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useForm } from 'react-hook-form'
import * as z from 'zod'


import { useToast } from '../ui/use-toast'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import { saveActivityLogsNotification, updateAgencyDetails } from '@/lib/queries'

type Props = {
    data?: Partial<Agency> 
}

const FormSchema = z.object({
    name: z.string().min(2, {message: "Agency Name must be atleast 2 characters"}),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    whiteLabel: z.boolean(),
    address: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    agencyLogo: z.string().min(1)

}
)

const AgencyDetails = ({data}: Props) => {
    const toast = useToast()
    const router = useRouter();
    const [deletingAgency, setDeletingAgency] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: data?.name,
            companyEmail: data?.companyEmail,
            companyPhone: data?.companyPhone,
            whiteLabel: data?.whiteLabel || false,
            address: data?.address,
            city: data?.city,
            zipCode: data?.zipCode,
            state: data?.state,
            country: data?.country,
            agencyLogo: data?.agencyLogo
        
        }
    });

    const isLoading = form.formState.isSubmitting

    useEffect(() => {
        if(data)
        {
            form.reset(data)
        }
    }, [data])

    const handleSubmit = async () => 
    {

    }

  return (
    <AlertDialog>
        <Card className='w-full'> 
            <CardHeader> 
                <CardTitle> Agency Information </CardTitle>
                <CardDescription>
                    Lets create an agency for your business. You can edit agency settings later from the agency settings tab
                </CardDescription>
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}
                    className='space-y-4'
                    >
                        <FormField 
                        disabled={isLoading}
                        control={form.control}
                        name="agencyLogo"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel> Agency Logo</FormLabel>
                                <FormControl> 

                                    <FileUpload 
                                    apiEndpoint="agencyLogo" 
                                    onChange={field.onChange}
                                    value={field.value}
                                    
                                    /> 
                                    
                                    
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className='flex md:flex-row gap-4'>

                            <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="name"
                            render={ ( {field} ) => 
                                <FormItem className='flex-1'>
                                    <FormLabel> Agency Name </FormLabel>
                                    <FormControl> 
                                        <Input  placeholder='Your Agency Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            >

                            </FormField>

                            <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="companyEmail"
                            render={ ( {field} ) => 
                                <FormItem className='flex-1'>
                                    <FormLabel> Agency Email </FormLabel>
                                    <FormControl> 
                                        <Input  placeholder='Your Agency Email' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            >

                            </FormField>

                        </div>

                        <div className='flex md:flex-row gap-4' >

                        <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="companyPhone"
                            render={ ( {field} ) => 
                                <FormItem className='flex-1'>
                                    <FormLabel> Agency Phone Number </FormLabel>
                                    <FormControl> 
                                        <Input  placeholder='Phone' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            >

                            </FormField>

                        </div>

                        <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="whiteLabel"
                            render={ ( {field} ) => {
                                return (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border gap-4 p-4'>
                                    <div>
                                    <FormLabel> Whitelabel Agency </FormLabel>
                                    <FormDescription>
                                    Turning on whilelabel mode will show your agency logo
                                     to all sub accounts by default. You can overwrite this functionality through sub account settings.
                                    </FormDescription>

                                    </div>

                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>

                                )
                            } }
                            >

                         </FormField>
                         
                         <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="address"
                            render={ ( {field} ) => 
                                <FormItem className='flex-1'>
                                    <FormLabel> Address </FormLabel>
                                    <FormControl> 
                                        <Input  placeholder='Address' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            >

                            </FormField>

                            <div className='flex md:flex-row gap-4'>

                            <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="city"
                            render={ ( {field} ) => 
                                <FormItem className='flex-1'>
                                    <FormLabel> City </FormLabel>
                                    <FormControl> 
                                        <Input  placeholder='City' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            >

                            </FormField>

                            <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="state"
                            render={ ( {field} ) => 
                                <FormItem className='flex-1'>
                                    <FormLabel> State </FormLabel>
                                    <FormControl> 
                                        <Input  placeholder='state' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            >

                            </FormField>

                            <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="zipCode"
                            render={ ( {field} ) => 
                                <FormItem className='flex-1'>
                                    <FormLabel> Zip Code </FormLabel>
                                    <FormControl> 
                                        <Input  placeholder='Zipcode' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            >

                            </FormField>

                            </div>

                            <FormField 
                            disabled={isLoading}
                            control={form.control}
                            name="country"
                            render={ ( {field} ) => 
                                <FormItem className='flex-1'>
                                    <FormLabel> Country </FormLabel>
                                    <FormControl> 
                                        <Input  placeholder='Country' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            >

                            </FormField>
                        {
                            // data?.id && 
                            <div className='flex flex-col gap-2'>
                                <FormLabel> Create A Goal </FormLabel>
                                <FormDescription>
                                    Create a goal for your agency. As your business grows your goals grow too so dont forget to set the bar higher
                                </FormDescription>
                                <NumberInput
                                defaultValue={data?.goal}
                                onValueChange={ async (val) => {
                                    if (!data?.id)
                                    return 
                                    await updateAgencyDetails(data.id, {goal: val})
                                    await saveActivityLogsNotification({
                                        agencyId: data.id,
                                        description: `Updated the agency goal to  ${val} `,
                                        subAccountId: undefined
                                    })
                                    router.refresh()
                                }}
                                min={1}
                                className='bg-background !border !border-input'
                                placeholder='Sub Account Goal'
                                />

                               
                            </div>
                        }
                         <Button
                         type="submit"
                         disabled={isLoading}
                         >
                             {isLoading ? "Loading... " : 'Save Agency Information'}

                        </Button>

                        
                    </form>
                </Form>

            </CardContent>
        </Card>
    </AlertDialog>
  )
}

export default AgencyDetails