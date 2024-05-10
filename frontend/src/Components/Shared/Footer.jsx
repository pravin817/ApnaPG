import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-12 bg-[#003B95] border-t border-[#535bf8] text-white relative bottom-0 z-[20]">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-between max-w-screen-2xl mx-auto px-10">
        <div className="flex flex-col gap-4 text-sm">
          <h6 className="text-base font-bold">Support</h6>
          <p className="text-white">Help Center</p>
          <p className="text-white">Get help with a safety issue</p>
          <p className="text-white">ApnaPG Cover</p>
          <p className="text-white">Supporting people with disabilities</p>
          <p className="text-white">Cancelation options</p>
          <p className="text-white">Our Covid-19 response</p>
          <p className="text-white">Report a neighborhood concern</p>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <h6 className="text-base font-bold">Community</h6>
          <p className="text-white">ApnaPG.org: Disaster relief housing</p>
          <p className="text-white">Combating discrimination</p>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <h6 className="text-base font-bold">Hosting</h6>
          <p className="text-white">Rent your home</p>
          <p className="text-white">ApnaPG Cover for Hosts</p>
          <p className="text-white">Explore hosting resources</p>
          <p className="text-white">Visit our community forum</p>
          <p className="text-white">How to host responsibly</p>
          <p className="text-white">Budget friendly apartments</p>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <h6 className="text-base font-bold">ApnaPG</h6>
          <p className="text-white">Newsroom</p>
          <p className="text-white">ApnaPG Cover for Hosts</p>
          <p className="text-white">Explore hosting resources</p>
          <p className="text-white">Visit our community forum</p>
          <p className="text-white">How to host responsibly</p>
          <p className="text-white">Budget friendly apartments</p>
        </div>
      </section>
      <hr className="bg-[#f7f7f7] mt-10 mb-6" />
      <section className="flex flex-row flex-wrap justify-between gap-10 px-10 max-w-screen-2xl mx-auto">
        <div className="flex flex-row flex-wrap items-center text-sm">
          <p className="text-white">© 2024 ApnaPG, Inc.</p>
          <span className="p-3">·</span>
          <p className="text-white">Terms</p>
          <span className="p-3">·</span>
          <p className="text-white">Privacy</p>
          <span className="p-3">·</span>
          <p className="text-white">Your Privacy Choices</p>
        </div>
        <div className="flex flex-row gap-5 min-w-[120px] items-center text-sm">
          <p className="text-white">English (US)</p>
          <FaFacebook className="w-6" size={23} />
          <FaLinkedin className="w-6" size={23} />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
