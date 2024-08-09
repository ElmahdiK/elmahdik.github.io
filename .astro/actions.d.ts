declare module "astro:actions" {
	type Actions = typeof import("/Users/ek_mac/Documents/elmahdik.github.io/src/actions")["server"];

	export const actions: Actions;
}