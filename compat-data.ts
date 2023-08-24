// This is not an actual .ts file but documentation using Typescript syntax. You can't actually use it.

/**
 * This is the "entrypoint" script for loading data. It accepts two data attributes on the <script>:
 *
 * * data-jsonp: a global callback function invoked when all data has been loaded (required)
 * * data-progressp: a global callback function invoked when a single data "source" has been retrieved (optional)
 *
 * ```html
 * <script src="http://tasairis.github.io/compat-data/entry.js" async crossorigin="anonymous" data-jsonp="onDataLoaded" data-progressp="onDataProgress"></script>
 * ```
 */
export type SOURCE_SCRIPT = HTMLScriptElement & {
	src: "https://tasairis.github.io/compat-data/entry.js",

	// attributes
	async: true, // recommended
	crossOrigin: "anonymous", // necessary for local development

	// callbacks
	dataset: {
		jsonp: typeof onDataLoaded,
		progressp?: typeof onDataProgress,
	},
};

/**
 * Global function to update with source download progress
 *
 * Data is split into multiple sources (URLs) to support caching. This process is opaque and contained entirely within
 * the SOURCE_SCRIPT. The script can optionally call-back as it loads these sources.
 *
 * When complete, all the data is aggregated and passed to onDataLoaded.
 *
 * @param {number} modsProgress - How many mods have been found in the sources loaded so far; will be >0 on the first invocation and ==totalMods on the last
 * @param {number} totalMods - Total number of mods, which is known by the loading script ahead of time
 * @param {number} sourcesProgress - How many sources have been loaded so far; will be 1 on the first invocation and ==totalSources on the last
 * @param {number} totalSources - Total number of sources that will be loaded
 */
export declare function onDataProgress(modsProgress: number, totalMods: number, sourcesProgress: number, totalSources: number): void;

/**
 * Global function to receive the final set of aggregated data after all sources and mods have been loaded
 *
 * @param {CompatData} data - The aggregated data
 */
export declare function onDataLoaded(data: CompatData): void;

/**
 * The data passed to onDataLoaded
 */
export interface CompatData {
	// Mod data
	data: ModData[];

	// Date the sources were last regenerated
	date: string;

	// Version of Skyrim SE that the sources are generated for; for some time after a Steam update, this will be the *old* version
	skyrim: string;

	// Total number of data sources aggregated
	sources: number;
}

/**
 * Supported mod sources
 */
export type ModSource =
	// LoversLab; has the most data, like category and LE/SE compatibility flagging
	| "loverslab"
	// Nexus, Skyrim LE
	| "nexus-le"
	// Nexus, Skyrim SE
	| "nexus-se"
	// Simple URL, like GitHub or Patreon
	| "url";

/**
 * Mods have some amount of conditional data
 *
 * * Mods from different sources will support different data
 * * Mods that "exist" (are live and available) will include more data than those that don't
 */
export type ModData = LoversLabMod | NexusLeMod | NexusSeMod | UrlMod;

/**
 * These fields are available for every source
 */
export type CommonMod<Source extends ModSource> = {
	// Short human-readable identifier
	id: string;

	// "Slug" identifier for the mod; unique across all mods, even those with duplicate names
	slug: string;

	// Source of the mod
	source: Source;

	// Discriminator to identify existing vs. removed mods
	status_exists: boolean;

	// Official mod name
	name: string;

	// Sortable version of the name after applying some transformations
	name_sort: string;

	// Mostly brief, mostly human-readable string describing the compatibility status of the mod
	status: string;

	// SE compatibility: native (made for SE), yes (LE but compatible), no (LE and not compatible), unknown
	// May be extended according to source
	compat_se: "native" | "yes" | "no" | "unknown";

	// LE compatibility: native (made for LE), yes (SE but backwards-compatible), no (SE and not backwards-compatible), unknown
	// May be extended according to source
	compat_le: "native" | "yes" | "no" | "unknown";
}

/**
 * A mod hosted on LoversLab
 */
export type LoversLabMod = CommonMod<"loverslab"> & {
	// Category name, determined as intelligently as possible
	ll_category: string;

	// SE compatibility, standard options plus: marked_yes (LE but marked as compatible) marked_no (LE and marked as not compatible)
	compat_se: "native" | "yes" | "marked_yes" | "no" | "marked_no" | "unknown";

	// LE compatibility, standard options plus: marked_yes (SE but marked as compatible) marked_no (SE and marked as not compatible)
	compat_le: "native" | "yes" | "marked_yes" | "no" | "marked_no" | "unknown";

	/**
	 * For mods where status_exists = true,
	 */

	// File ID, as see in the /files URL
	ll_id?: number;

	// The canonical /files URL
	ll_url?: string;

	// The date/time the mod was last seen, as a Date-parseable string
	ll_lastseen?: string;

	// The date/time the mod was last updated, as a Date-parseable string
	ll_lastupdated?: string;
};

/**
 * A Skyrim LE mod hosted on the Nexus
 */
export type NexusLeMod = CommonMod<"nexus-le"> & {
	// The canonical /mod URL
	nexus_url: string;
};

/**
 * A Skyrim SE mod hosted on the Nexus
 */
export type NexusSeMod = CommonMod<"nexus-se"> & {
	// The canonical /mod URL
	nexus_url: string;
};

/**
 * A mod with only a URL
 */
export type UrlMod = CommonMod<"url"> & {
	// The target URL
	url: string;
}
