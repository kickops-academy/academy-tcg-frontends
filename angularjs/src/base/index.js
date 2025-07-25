import angular from "angular";
import { baseLayoutWrapper } from "@/base/base.layout";

export const base = angular.module(
  "base",
  []
);

baseLayoutWrapper(base);
