//* fetch helpers
const fetchJson = async (url: string, init = {}) => {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`${res.status}: ${await res.text()}`);
  }
  return res.text();
};

const fetchAndSetAll = async (
  collection: { url: string; setter: (text: string) => void }[]
) => {
  const allData = await Promise.all(
    collection.map(({ url, setter }) => fetchJson(url, setter))
  );

  collection.forEach(({ setter }, i) => {
    setter(allData[i]);
  });
};

//* create button list
// prettier-ignore
const buttons = ["week4/left_rotation","week4/number_line_jumps","week4/tower_breakers","week4/closest_numbers","week4/caesar_cipher","week4/picking_numbers","week4/minimum_absolute_difference_in_an_array","week4/separate_the_numbers","week5/max_min","week5/strong_password","week3/drawing_book","week3/xor_strings_3","week3/zig_zag_sequence","week3/permuting_two_arrays","week3/maximum_perimeter_triangle","week3/migratory_birds","week3/subarray_division_2","week3/sales_by_match","week2/pangrams","week2/lonely_integer","week2/counting_valleys","week2/flipping_bits","week2/mars_exploration","week2/diagonal_difference","week2/counting_sort_1","week2/grading_students","week1/breaking_the_records","week1/plus_minus","week1/mini_max_sum","week1/camel_case_4","week1/time_conversion","week1/divisible_sum_pairs","week1/sparse_arrays"];

export { buttons, fetchAndSetAll };
