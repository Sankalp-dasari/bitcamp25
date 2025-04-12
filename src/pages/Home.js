import React from 'react';
import { Link } from 'react-router-dom';
import CarbonCaptureChart from '../components/charts/CarbonCaptureChart';
import GroundStateEnergyChart from '../components/charts/GroundStateEnergyChart';
import { teamMembers, implementationSteps } from '../data/mofsData';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Title */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
            <span className="inline-block border-b-2 border-gray-300 w-16 mr-4"></span>
            Title
            <span className="inline-block border-b-2 border-gray-300 w-16 ml-4"></span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-8">BitComp 25</h2>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
                  <span className="text-2xl">😊</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{member.name}</h3>
                <p className="text-gray-600 text-center text-sm">{member.role}</p>
                <div className="border-b-2 border-gray-200 w-16 my-3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Objective Section */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Objective</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <p className="text-gray-700 mb-4">
                  Our project aims to develop innovative Metal-Organic Frameworks (MOFs) for efficient carbon capture and improved energy systems. Through computational design and AI optimization, we're creating structures that outperform conventional materials.
                </p>
                <p className="text-gray-700 mb-4">
                  We combine advanced modeling techniques with experimental validation to produce MOFs with enhanced properties for environmental applications.
                </p>
                <p className="text-gray-700">
                  The objective is to address climate challenges through materials science innovation, creating sustainable solutions for carbon reduction and energy efficiency.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4">MOF Structure</h3>
                <div className="flex flex-col space-y-3">
                  <div className="border-b border-gray-200 pb-2">Metal clusters</div>
                  <div className="border-b border-gray-200 pb-2">Organic linkers</div>
                  <div className="border-b border-gray-200 pb-2">3D frameworks</div>
                  <div className="border-b border-gray-200 pb-2">Porous cavities</div>
                  <div className="border-b border-gray-200 pb-2">High surface area</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Implementation</h2>
          <div className="relative">
            {/* Desktop Implementation Flow */}
            <div className="hidden md:flex justify-between items-center mb-16">
              <div className="w-36 h-36 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center z-10 text-lg font-medium">Design</div>
              <div className="flex-1 border-t-2 border-gray-300 border-dashed mx-2"></div>
              <div className="w-36 h-36 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center z-10 text-lg font-medium">Simulate</div>
              <div className="flex-1 border-t-2 border-gray-300 border-dashed mx-2"></div>
              <div className="w-36 h-36 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center z-10 text-lg font-medium">Optimize</div>
              <div className="flex-1 border-t-2 border-gray-300 border-dashed mx-2"></div>
              <div className="w-36 h-36 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center z-10 text-lg font-medium">Validate</div>
            </div>

            {/* Mobile Implementation Flow */}
            <div className="md:hidden space-y-6">
              {implementationSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center shrink-0 text-sm font-medium">
                    {step.title}
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Results</h2>
          <h3 className="text-xl font-medium mb-8 text-center">New MOFs Created</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-center">Carbon Capture</h4>
              <div className="bg-white rounded-lg shadow-md p-4">
                <CarbonCaptureChart />
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div className="border p-2 rounded-md bg-gray-50">
                    <h5 className="font-medium text-sm">Existing</h5>
                  </div>
                  <div className="border p-2 rounded-md bg-gray-50">
                    <h5 className="font-medium text-sm">AI</h5>
                  </div>
                  <div className="border p-2 rounded-md bg-gray-50">
                    <h5 className="font-medium text-sm">Compare</h5>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  Carbon capture graphs
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-center">Ground State Energy</h4>
              <div className="bg-white rounded-lg shadow-md p-4">
                <GroundStateEnergyChart />
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div className="border p-2 rounded-md bg-gray-50">
                    <h5 className="font-medium text-sm">Existing</h5>
                  </div>
                  <div className="border p-2 rounded-md bg-gray-50">
                    <h5 className="font-medium text-sm">AI</h5>
                  </div>
                  <div className="border p-2 rounded-md bg-gray-50">
                    <h5 className="font-medium text-sm">Compare</h5>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  Ground state energy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Vision</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className="border-2 border-gray-300 rounded-lg p-2 w-full aspect-square flex items-center justify-center">
                <p className="text-gray-500">Some image</p>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-gray-700 mb-4">
                Our vision is to revolutionize environmental sustainability through advanced materials science. We aim to create MOF technologies that can be implemented globally to reduce carbon emissions and enhance energy efficiency.
              </p>
              <p className="text-gray-700 mb-4">
                By combining computational design with experimental validation, we're building a pathway to scale these solutions for industrial applications and climate impact.
              </p>
              <p className="text-gray-700">
                The long-term goal is to establish a framework for continuous innovation in materials science that addresses evolving environmental challenges and contributes to a more sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Learn More About Our Project</h2>
          <div className="flex justify-center gap-4">
            <Link to="/research" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Research Papers
            </Link>
            <Link to="/contact" className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-gray-50 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;