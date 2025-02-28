const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center p-5 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        <p className="text-sm">© {new Date().getFullYear()} Newspaper Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
