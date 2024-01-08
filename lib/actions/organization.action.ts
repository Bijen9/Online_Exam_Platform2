"use server";
import Organization from "@/database/organization.model";

import { connectTodatabase } from "../mongoose";

export default async function createOrganization(params: any) {
  try {
    connectTodatabase();
    const { organizationData } = params;

    const organization = await Organization.create({
      organizationData,
    });
    return organization;
  } catch (error) {
    throw error;
  }
}

export async function getOrganization(params: any) {
  try {
    connectTodatabase();
    const { organizationId } = params;
    const organization = await Organization.findById(organizationId);
    return organization;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrganization(params: any) {
  try {
    connectTodatabase();
    const organization = await Organization.find();
    return organization;
  } catch (error) {
    throw error;
  }
}

// search organization by name
export async function searchOrganization(params: any) {
  try {
    connectTodatabase();
    const { organizationName } = params;
    const organization = await Organization.find({
      name: { $regex: organizationName, $options: "i" },
    });
    return organization;
  } catch (error) {
    throw error;
  }
}
