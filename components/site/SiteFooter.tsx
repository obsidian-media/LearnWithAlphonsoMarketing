import Link from "next/link";
import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/links";
import { courseList } from "@/lib/facts";
import { ART } from "@/lib/site-art";

const LEGAL = "https://learn.alphonsoecosystem.app";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div>
          <Link className="brand" href="/">
            <Image src={ART.pose.happy} alt="" width={44} height={44} />
            Alphonso
          </Link>
          <p className="body">{courseList()}, a few minutes at a time. Built by Obsidian Media.</p>
        </div>
        <div>
          <h2>Product</h2>
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/download">Download</Link>
          <Link href="/placement-test">Placement test</Link>
        </div>
        <div>
          <h2>Read</h2>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Follow @learnwithalphonso on Instagram
          </a>
        </div>
        <div>
          <h2>Legal</h2>
          <a href={`${LEGAL}/privacy`}>Privacy</a>
          <a href={`${LEGAL}/terms`}>Terms</a>
          <a href={`${LEGAL}/cookies`}>Cookies</a>
        </div>
      </div>
      <div className="wrap">
        <small>
          © {new Date().getFullYear()} Shayan Salimi (Obsidian Media). All rights reserved.
        </small>
      </div>
    </footer>
  );
}
