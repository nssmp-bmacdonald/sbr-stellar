import { formatDateParameter } from '../../../helpers/date-helpers';

test('format today\'s date', () => {
    const today = new Date();

    let expectedDate = today.toISOString().split('T')[0];
    expectedDate = expectedDate + " 05:00:00+00" ;

    const format = formatDateParameter(today);

    expect(format).toEqual(expectedDate);
 });

 test('format Jan 31/2022 date', () => {
    const dateStr = '2022-01-31';
    const expectedDate = `${dateStr} 05:00:00+00`;

    const format = formatDateParameter(dateStr);

    expect(format).toEqual(expectedDate);
 });