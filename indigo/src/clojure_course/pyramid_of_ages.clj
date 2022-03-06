(ns clojure-course.pyramid-of-ages
  (:require [clojure.string :as s]))

(defn birth-year->age [current-year birth-year]
  (max 0 (int (- current-year birth-year))))

(defn round [bucket-size num]
  (* bucket-size (int (/ num bucket-size))))

(defn age->bucket [age]
  (let [low  (round 5 age)
        high (+ low 5)]
    (str low "-" high)))

(defn persons->pyramid [year persons]
  (reduce (fn [pyramid [gender birth-year]]
            (let [age    (birth-year->age year birth-year)
                  bucket (age->bucket age)]
              (update-in pyramid [gender bucket] (fnil inc 1))))
          {}
          persons))

(defn bucket->low [a]
  (read-string (first (s/split  a #"\-"))))

(defn sort-age-map [age-map]
  (sort-by (comp bucket->low first)
           age-map))

(def persons (repeatedly 1000 #(vector (rand-nth ["men" "women"]) (rand-nth (range 1936 2019)))))

(defn sort-pyramid [pyramid]
  (into {}
        (for [[gender age-map] pyramid]
          [gender (sort-age-map age-map)])))

(def pyramid (persons->pyramid 2019 persons))
(sort-pyramid pyramid)
