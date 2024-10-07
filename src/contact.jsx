import React from 'react';

function Contact() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <p className="text-center text-gray-600 mb-12">
          We're here to help you! Fill out the form below or reach out to us directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Contact Form</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-md"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-2"><strong>Address:</strong> Mumbai, Maharashtra, India</p>
            <p className="mb-2"><strong>Email:</strong> <a href="mailto:omkarthorat7276@gmail.com" className="text-indigo-600 hover:underline">iomkarthorat7276@gmail.com</a></p>
            <p className="mb-2"><strong>Phone:</strong> <a href="tel:+917276195350" className="text-indigo-600 hover:underline">+91 7276195350</a></p>
            <p className="mb-2"><strong>Working Hours:</strong> Mon - Fri: 9:00 AM - 6:00 PM</p>

            {/* Map Section */}
            <h3 className="text-2xl font-semibold mb-4 mt-6">Find Us Here</h3>
            <div className="h-48 w-full">
              <iframe
                title="Google Map"
                className="w-full h-full rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096047!2d144.95373531558603!3d-37.81627997975177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0b1677cf%3A0xf8c295ae5a48ef2b!2s123%20Green%20Avenue%2C%20Waste%20Management%20City%2C%20XYZ%2010101!5e0!3m2!1sen!2sus!4v1638472573089!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
