import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Categories</Link></li>
              <li><Link href="/events" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Events</Link></li>
              <li><Link href="/map" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Map</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Popular Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/categories/restaurants" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Restaurants</Link></li>
              <li><Link href="/categories/beaches" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Beaches</Link></li>
              <li><Link href="/categories/activities" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Activities</Link></li>
              <li><Link href="/categories/accommodation" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Accommodation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2">
              <li>Email: info@javeadirectory.com</li>
              <li>Phone: +34 123 456 789</li>
              <li>Address: Avenida del Mediterráneo, Jávea, Spain</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Social media icons will be added here */}
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm">
          © {new Date().getFullYear()} Jávea Directory. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
