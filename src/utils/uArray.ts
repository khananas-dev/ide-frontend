export function UArray(this: any, val?: any) {
  this.values = [];
  if (typeof val !== "undefined") {
    this.set(val);
  }
}
UArray.prototype.set = function (values: any) {
  this.values = this.values
    .concat(values)
    .filter(function (el: any, i: any, arr: string | any[]) {
      return arr.indexOf(el) === i;
    });
};
UArray.prototype.get = function () {
  return this.values;
};
