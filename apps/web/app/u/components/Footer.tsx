export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 w-full">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Culture and Heritage. All rights reserved.</p>
                <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a> |{" "}
                <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a> |{" "}
                <a href="/contact" className="text-blue-400 hover:underline">Contact Us</a>
            </div>
        </footer>
    );
}