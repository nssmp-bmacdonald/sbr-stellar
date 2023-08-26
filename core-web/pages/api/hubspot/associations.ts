import type { NextApiRequest, NextApiResponse } from 'next';
import { getAssociations, getCustomObjects } from '../../../lib/hubspot';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { fromObjectType, fromObjectId, toObjectType } = req.body;

  if (!fromObjectType || !fromObjectId || !toObjectType) {
    return res.status(400).send('Invalid request info');
  }

  const associations = await getAssociations(
    fromObjectType,
    toObjectType,
    fromObjectId
  );

  if (associations.numErrors > 0) {
    return res.status(400).send('No associations found');
  }

  const associatedIds = associations.results[0]?.to.map((customObj: any) => {
    return { id: customObj.id };
  });

  const associatedObjects = await getCustomObjects(toObjectType, associatedIds);
  res.status(200).json(associatedObjects);
}
