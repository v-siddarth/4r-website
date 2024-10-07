import React from 'react'

function InfoSection() {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          
          {/* Image Section */}
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt="Waste Management"
                src="banner.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
    
          {/* Content Section */}
          <div className="relative flex items-center bg-gray-100">
            <span
              className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
            ></span>
    
            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Join Us in Making the World Greener
              </h2>
    
              <p className="mt-4 text-gray-600">
                At [Your Company Name], we are committed to effective waste management and recycling solutions. Our platform connects individuals and businesses to responsibly dispose of and recycle various types of waste, ensuring a cleaner and more sustainable environment for future generations.
              </p>
    
              <a
                href="#contact"
                className="mt-8 inline-block rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection
