import { Module } from "@medusajs/framework/utils";
import SanityModuleService, { SANITY_MODULE } from "./service";

export default Module(SANITY_MODULE, {
  service: SanityModuleService,
});
