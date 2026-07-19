import React from 'react'
import Title from './Title'
import assets from '../assets/assets'

const Services = () => {

    const servicesData = [
        {
            title: "Advertising",
            description: "We create compelling advertising campaigns that resonate with your target audience, driving engagement and conversions.",
            icon: assets.ads_icon
        },
        {
            title: "Content Marketing",
            description: "We develop engaging content strategies that build brand awareness and drive traffic to your website.",
            icon: assets.marketing_icon
        },
        {
            title: "Content writing",
            description: "We create compelling content that resonates with your target audience, driving engagement and conversions.",
            icon: assets.content_icon
        },
        {
            title: "Social media",
            description: "We create compelling social media campaigns that engage your audience and drive brand awareness.",
            icon: assets.social_icon
        },
    ]
  return (
    <div id='services' className='relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>

        <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70-z-1 dark:hidden' />

        <Title title='How can we help?' desc='We offer a range of services to help your business grow and succeed in the digital landscape.' />

    </div>
  )
}

export default Services