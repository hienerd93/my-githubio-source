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
const buttons = ["public/week2/mars_exploration","public/week2/pangrams","public/week2/counting_sort_1","public/week2/flipping_bits","public/week2/grading_students","public/week2/lonely_integer","public/week2/counting_valleys","public/week2/diagonal_difference","public/week4/closest_numbers","public/week4/left_rotation","public/week4/tower_breakers","public/week4/number_line_jumps","public/week4/caesar_cipher","public/week4/picking_numbers","public/week4/separate_the_numbers","public/week4/minimum_absolute_difference_in_an_array","public/week1/plus_minus","public/week1/divisible_sum_pairs","public/week1/breaking_the_records","public/week1/time_conversion","public/week1/mini_max_sum","public/week1/sparse_arrays","public/week1/camel_case_4","public/week3/zig_zag_sequence","public/week3/xor_strings_3","public/week3/maximum_perimeter_triangle","public/week3/migratory_birds","public/week3/subarray_division_2","public/week3/drawing_book","public/week3/permuting_two_arrays","public/week3/sales_by_match","public/week5/missing_numbers","public/week5/strong_password","public/week5/max_min"];

export { buttons, fetchAndSetAll };
