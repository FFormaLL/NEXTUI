import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Button, ButtonGroup } from "@nextui-org/button";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h2 style={{ color: "violet" }} className={subtitle({ class: "mt-4" })}>
					Click on something to get started!
				</h2>
			</div>

			<div className="flex flex-wrap gap-4 items-center">
				{/* <Button color="primary" variant="solid">
        Solid
      </Button>
      <Button color="primary" variant="faded">
        Faded
      </Button>  
      <Button color="primary" variant="bordered">
        Bordered
      </Button>  
      <Button color="primary" variant="flat">
        Flat
      </Button>   */}
				<Link href="ai">
					<Button color="primary" variant="ghost">
						AI Chat
					</Button> </Link>
				{/* <Button color="primary" variant="shadow">
        Shadow
      </Button>   */}
			</div>

		</section>
	);
}
