-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Des 2022 pada 10.03
-- Versi server: 10.4.16-MariaDB
-- Versi PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abekahotel`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(3, 'administrator', '$2a$10$9fDh7zUvKyGoUq82kTUrGO32a5dmOcv1Kq7b9NhyEIBuEF2qacqgG'),
(4, 'admin111', '$2a$10$IQOmUeacPupPVc1w/zm3weCLMVAN4BQX.Z5IqZ8qPDQXI5m/eSsoy'),
(6, 'abekahotel', '$2a$10$3AQWwxJpLIvGnSbx9aiPuOLFo6S/aJC68PQulD0U3mmnTbLmmZVNO'),
(7, 'abeka', '$2a$10$D3CzMDtfwlh2XZw08WwlauV2vG2exeE.2Dalzh0XjkIxZ/k7J.fDC'),
(8, 'admin', '$2a$10$o/kmVsW8pjwgF2AmHdIdzeBl4tAFN05dQw9mKygw6PLMJ7UVxfDwy');

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `id_booking` int(11) NOT NULL,
  `nama_booking` varchar(255) NOT NULL,
  `alamat_booking` varchar(255) NOT NULL,
  `email_booking` varchar(255) NOT NULL,
  `notelp_booking` varchar(13) NOT NULL,
  `jumlah_hari` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`id_booking`, `nama_booking`, `alamat_booking`, `email_booking`, `notelp_booking`, `jumlah_hari`) VALUES
(4, 'ada', 'bandung', 'arba@gmail.com', '801321321', 2),
(5, 'Mahran', 'Cipadung', 'mahran@gmail.com', '123123', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL,
  `nama_kamar` varchar(255) NOT NULL,
  `harga_kamar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `nama_kamar`, `harga_kamar`) VALUES
(1, 'Family', 'Family Room', '450.000'),
(2, 'Deluxe', 'Deluxe Room', '450.000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment`
--

CREATE TABLE `payment` (
  `id_payment` int(11) NOT NULL,
  `nama_pengirim` varchar(255) NOT NULL,
  `asal_bank` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `payment`
--

INSERT INTO `payment` (`id_payment`, `nama_pengirim`, `asal_bank`) VALUES
(1, 'Arbaap', 'BCA');

-- --------------------------------------------------------

--
-- Struktur dari tabel `rooms`
--

CREATE TABLE `rooms` (
  `id_rooms` int(11) NOT NULL,
  `nama_rooms` varchar(255) NOT NULL,
  `harga_rooms` varchar(255) NOT NULL,
  `image_rooms` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `rooms`
--

INSERT INTO `rooms` (`id_rooms`, `nama_rooms`, `harga_rooms`, `image_rooms`) VALUES
(1, 'Oyo', '450.000', 'https://images.oyoroomscdn.com/uploads/hotel_image/18776/large/f2791b1d02149850.jpg'),
(2, 'Ayo', '500.000', 'https://images.oyoroomscdn.com/uploads/hotel_image/18776/large/f3425b15eb214aa3.jpg');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id_booking`);

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id_payment`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `payment`
--
ALTER TABLE `payment`
  MODIFY `id_payment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
