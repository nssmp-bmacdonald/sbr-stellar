import { Client } from '@hubspot/api-client';
import { Property } from '@hubspot/api-client/lib/codegen/crm/properties';
import { IProperties } from '../types/hubspot';

const hubspotClient = new Client({
  accessToken: 'pat-na1-455845af-57a6-4c14-a00e-f176da106cde',
});

export async function getHSAllContacts(): Promise<any | null> {
  try {
    const result = await hubspotClient.crm.contacts.getAll();
    return result;
  } catch (e: any) {
    return null;
  }
}

export async function getHSContactById(
  contactId: string,
  properties: any[]
): Promise<any | null> {
  const propertiesWithHistory = undefined;
  const associations = undefined;
  const archived = false;

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(
      contactId,
      properties,
      propertiesWithHistory,
      associations,
      archived
    );
    return JSON.parse(JSON.stringify(apiResponse));
  } catch (e: any) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);

    return null;
  }
}

export async function getHSContactByName(
  name: string,
  properties: any[]
): Promise<{ total: number; results: any[] } | null> {
  try {
    const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'login_name',
              operator: 'EQ',
              value: name,
            },
          ],
        },
      ],
      sorts: ['login_name'],
      after: 0,
      limit: 1,
      properties,
    });
    return JSON.parse(JSON.stringify(apiResponse));
  } catch (e: any) {
    //console.error(e);
    return null;
  }
}

export async function updateHSContact(
  contactId: string,
  prop: Partial<IProperties>
): Promise<any | null> {
  try {
    const SimplePublicObjectInput = { properties: prop };
    const apiResponse = await hubspotClient.crm.contacts.basicApi.update(
      contactId,
      SimplePublicObjectInput
    );
    return JSON.stringify(apiResponse);
  } catch (e: any) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
    return null;
  }
}

export async function getHSProperty(
  propName: string
): Promise<Property | null> {
  const objectType = 'contact';
  const propertyName = propName;
  const archived = false;
  const properties = undefined;

  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(
      objectType,
      propertyName,
      archived,
      properties
    );
    return JSON.parse(JSON.stringify(apiResponse));
  } catch (e: any) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
    return null;
  }
}

export async function getAssociations(
  fromObjectType: string,
  toObjectType: string,
  id: string
) {
  try {
    const apiResponse = await hubspotClient.crm.associations.batchApi.read(
      fromObjectType,
      toObjectType,
      {
        inputs: [{ id }],
      }
    );
    return JSON.parse(JSON.stringify(apiResponse));
  } catch (err: any) {
    console.log(err);
    return null;
  }
}

export async function getCustomObjects(objectType: string, objectIds: any) {
  try {
    const customObjects = await hubspotClient.crm.objects.batchApi.read(
      objectType,
      {
        inputs: objectIds,
        propertiesWithHistory: [''],
        properties: [
          'prize',
          'type',
          'description',
          'link',
          'date',
          'contest_name',
        ],
      }
    );
    return JSON.parse(JSON.stringify(customObjects));
  } catch {
    return null;
  }
}

export async function getDefinitions(): Promise<any | null> {
  try {
    const apiResponse =
      await hubspotClient.communicationPreferences.definitionApi.getPage();
    return JSON.parse(JSON.stringify(apiResponse, null, 2));
  } catch (e: any) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
    return null;
  }
}
