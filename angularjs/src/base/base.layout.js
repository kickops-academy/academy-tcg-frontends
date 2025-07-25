import template from "@/base/base.layout.html?url";

BaseLayout.$inject = ["$scope", "$http"];

function BaseLayout($scope, $http) {
  const ctrl = this;

  $scope.demo = "GHell";

  $scope.POKEMON_TYPES = [
    { label: "Colorless", icon: "⚪️" },
    { label: "Darkness", icon: "🌑" },
    { label: "Dragon", icon: "🐉" },
    { label: "Fairy", icon: "🧚" },
    { label: "Fighting", icon: "🥊" },
    { label: "Fire", icon: "🔥" },
    { label: "Grass", icon: "🌿" },
    { label: "Lightning", icon: "⚡️" },
    { label: "Metal", icon: "⚙️" },
    { label: "Psychic", icon: "🔮" },
    { label: "Water", icon: "💧" },
  ];

  $scope.cards = [];

  $scope.type = null;

  $scope.loading = false;

  this.$onInit = function () {
    console.log("BaseLayout initialized");
  }

  $scope.setFilter = function (type) {
    $scope.type = $scope.type === type ? null : type;
    $scope.cards = [];

    if ($scope.type) {
      $http({
        method: "GET",
        url: "http://localhost:3000/card/pokemon/" + $scope.type + "?amount=8",
      }).then(
        function successCallback(response) {
          $scope.cards = response.data;
        },
        function errorCallback(response) {
          console.error("Error fetching cards:", response);
          $scope.cards = [];
        }
      );
    }
  }
}

console.log(template);

/**
 * @param {import("angular").IModule} module 
 */
export function baseLayoutWrapper(module) {
  module.component("baseLayout", {
    bindings: {},
    templateUrl: template,
    controller: BaseLayout
  })
};
